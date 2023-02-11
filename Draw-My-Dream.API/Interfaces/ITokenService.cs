using Core.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateAccessToken(AppUserEntity user);
        string CreateRefreshToken(AppUserEntity user);
    }
}