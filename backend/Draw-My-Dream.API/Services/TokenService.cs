using Core.Interfaces;
using Core.Entities;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        private readonly UserManager<AppUserEntity> _userManager;
        public TokenService(IConfiguration config, UserManager<AppUserEntity> userManager)
        {
            _userManager = userManager;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public async Task<string> CreateAccessToken(AppUserEntity user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(type: "id", user.Id.ToString()),
                new Claim(type: "userName", user.UserName)
            };

            IList<string> roles = await _userManager.GetRolesAsync(user);

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            SigningCredentials creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);         
            
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(5), 
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            
            return tokenHandler.WriteToken(token);
        }

        public string CreateRefreshToken(AppUserEntity user)
        {
            Dictionary<string, string> hashData = new Dictionary<string, string>()
            {
                { "id", user.Id.ToString() },
                { "name", user.UserName },
                { "date", DateTime.Now.ToString() },
                { "ulid", new Ulid().ToString() }
            };
            
            byte[] dataBytes = Encoding.UTF8.GetBytes(hashData.ToString() + new byte[64]);

            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(dataBytes);

            string refreshToken = Convert.ToBase64String(dataBytes, Base64FormattingOptions.InsertLineBreaks);

            return refreshToken;
        }
    }
}

