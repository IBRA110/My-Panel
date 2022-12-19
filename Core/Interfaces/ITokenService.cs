using System.IdentityModel.Tokens.Jwt;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        string CreateAccessToken(AppUserEntity user);
        string CreateRefreshToken(AppUserEntity user);
        JwtSecurityToken GetDecodedAccessToken(string parameter);
        string GetDecodedRefreshToken(string parameter);
    }
}