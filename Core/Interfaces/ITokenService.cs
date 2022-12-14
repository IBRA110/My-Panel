using System.IdentityModel.Tokens.Jwt;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        string CreateAccessToken(AppUser user);
        string CreateRefreshToken(AppUser user);
        JwtSecurityToken GetDecodedAccessToken(string parameter);
        string GetDecodedRefreshToken(string parameter);
    }
}