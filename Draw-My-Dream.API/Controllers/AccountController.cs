using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using Core.Entities;
using Infrastracture.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IUserInterface _userRepository;
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IUserInterface _userInterface;
        
        public AccountController(
            DataContext context, 
            ITokenService tokenService, 
            IUserInterface userRepository,
            IMapper mapper,
            IUserInterface userInterface
        )
        {
            _tokenService = tokenService;
            _context = context;
            _userRepository = userRepository;
            _mapper = mapper;
            _userInterface = userInterface;
        }

        [HttpPost("register")]
        public async Task<ActionResult<SuccessDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Username))
            {
                throw new Exception("Username is already taken");
            }
            if (await EmailExists(registerDTO.Email))
            {
                throw new Exception("Email is already taken");
            }
            
            AppUserEntity user = _mapper.Map<AppUserEntity>(registerDTO);

            HMACSHA512 hmac = new HMACSHA512();
            
            user.UserName = registerDTO.Username;
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password));
            user.PasswordSalt = hmac.Key;


            _context.Users.Add(user);
            await _context.SaveChangesAsync();
             
            return new SuccessDTO
            {
                Message = "Registration Successful"
            };
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDTO>> Login(LoginDTO loginDTO)
        {

            AppUserEntity user = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName.ToLower() == loginDTO.UserName.ToLower());

            if (user == null)
            {
                throw new ArgumentException("User does not exist!");
            }
            
            HMACSHA512 hmac = new HMACSHA512(user.PasswordSalt);
            byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    throw new ArgumentException("Password is wrong!");
                }
            }
            
            string refreshToken = _tokenService.CreateRefreshToken(user);
            
            user.RefreshToken = refreshToken;
            await _context.SaveChangesAsync();

            return new LoginResponseDTO
            {
                AccessToken = _tokenService.CreateAccessToken(user),
                RefreshToken = refreshToken
            };
        }

        [HttpPost("refresh")]
        [Authorize]
        public async Task<ActionResult<LoginResponseDTO>> Refresh(RefreshTokenDTO refreshToken)
        {
            AppUserEntity user = await _userInterface.GetUserByIdAsync(Ulid.Parse(User.FindFirst("Id").Value));

            if (user == null || refreshToken.RefreshToken != user.RefreshToken)
            {
                throw new ArgumentException("Something went wrong!");
            }

            user.RefreshToken = _tokenService.CreateRefreshToken(user);
            await _context.SaveChangesAsync();
            
            return new LoginResponseDTO
            {
                AccessToken = _tokenService.CreateAccessToken(user),
                RefreshToken = user.RefreshToken
            };
        }
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }

        private async Task<bool> EmailExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }
    }
}
