using Core.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
        string CreateAccessToken(AppUserEntity user);
        string CreateRefreshToken(AppUserEntity user);
    }
}