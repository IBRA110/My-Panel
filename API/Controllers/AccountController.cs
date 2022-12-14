using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Username))
            {
                return BadRequest("Username is taken");
            }
            
            HMACSHA512 hmac = new HMACSHA512();
            AppUser user = new AppUser
            {
                Id = Ulid.NewUlid(),
                UserName = registerDTO.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            
            
            return Ok("Success!");
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            AppUser user = await _context.Users
                .SingleOrDefaultAsync(x => x.UserName.ToLower() == loginDTO.Username.ToLower());
            if (user == null)
            {
                return Unauthorized("Invalid username");
            }
            
            HMACSHA512 hmac = new HMACSHA512(user.PasswordSalt);
            byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid password");
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
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }
    }
}