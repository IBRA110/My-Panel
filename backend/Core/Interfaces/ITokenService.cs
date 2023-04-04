using Core.Entities;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateAccessToken(AppUserEntity user);
        string CreateRefreshToken(AppUserEntity user);
    }
}