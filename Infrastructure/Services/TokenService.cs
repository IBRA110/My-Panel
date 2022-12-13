using Core.Interfaces;
using Core.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;

namespace Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public string CreateAccessToken(AppUser user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Id.ToString()),
                new Claim(ClaimTypes.DateOfBirth, user.Id.ToString()),
            };

            SigningCredentials creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(15),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public string CreateRefreshToken(AppUser user)
        {
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddMinutes(15),
            };
            
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}