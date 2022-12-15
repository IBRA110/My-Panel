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
                new Claim(type: "Id", user.Id.ToString()),
                new Claim(type: "UserName", user.UserName)
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
            Dictionary<string, string> hashData = new Dictionary<string, string>()
            {
                { "id", user.Id.ToString() },
                { "name", user.UserName },
                { "date", DateTime.Now.ToString() },
                { "Ulid", new Ulid().ToString() }
            };
            
            byte[] dataBytes = Encoding.UTF8.GetBytes(hashData.ToString() + new byte[64]);

            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(dataBytes);

            string refreshToken = Convert.ToBase64String(dataBytes, Base64FormattingOptions.InsertLineBreaks);

            return refreshToken;
        }

        public JwtSecurityToken GetDecodedAccessToken(string parameter)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

            JwtSecurityToken jwtSecurityToken = handler.ReadJwtToken(parameter);

            return jwtSecurityToken;
        }
        
        public string GetDecodedRefreshToken(string parameter)
        {
            byte[] base64EncodedBytes = Convert.FromBase64String(parameter);
            
            string refreshToken = Encoding.UTF8.GetString(base64EncodedBytes);

            return refreshToken;
        }
    }
}

