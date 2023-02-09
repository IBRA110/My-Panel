using System.Security.Cryptography;
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
        private readonly IUserBehaviour _userBehaviour;
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        
        public AccountController(
            DataContext context, 
            ITokenService tokenService, 
            IUserBehaviour userBehaviour,
            IMapper mapper
        )
        {
            _tokenService = tokenService;
            _context = context;
            _userBehaviour = userBehaviour;
            _mapper = mapper;
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
            AppUserEntity user = await _userBehaviour.GetUserByIdAsync(User.FindFirst("Id").Value);

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
