using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using API.Entities;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService, IUserRepository userRepository)
        {
            _tokenService = tokenService;
            _context = context;
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Username))
            {
                throw new ArgumentException("Username is already taken");
            } 
            
            HMACSHA512 hmac = new HMACSHA512();
            AppUserEntity user = new AppUserEntity
            {
                UserName = registerDTO.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            
            
            return Ok("Success!");
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {

            AppUserEntity user = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName.ToLower() == loginDTO.Username.ToLower());

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

            return new UserDTO
            {
                AccessToken = _tokenService.CreateAccessToken(user),
                RefreshToken = refreshToken
            };
        }

        [HttpPost("refresh")]
        [Authorize]
        public async Task<ActionResult<UserDTO>> Refresh(RefreshTokenDTO refreshToken)
        {

            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            
            Ulid id = Ulid.Parse(identity.FindFirst("Id").Value);
   
            AppUserEntity user = await _userRepository.GetUserByIdAsync(id);

            if (user == null || refreshToken.Refreshtoken != user.RefreshToken)
            {
                throw new ArgumentException("Something went wrong!");
            }

            user.RefreshToken = _tokenService.CreateRefreshToken(user);
            await _context.SaveChangesAsync();
            
            return new UserDTO
            {
                AccessToken = _tokenService.CreateAccessToken(user),
                RefreshToken = user.RefreshToken
            };
        }
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }
    }
}
