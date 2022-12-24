using System.IdentityModel.Tokens.Jwt;
using API.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
        string CreateAccessToken(AppUserEntity user);
        string CreateRefreshToken(AppUserEntity user);
    }
}