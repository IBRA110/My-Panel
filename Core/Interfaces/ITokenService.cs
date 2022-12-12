using Core.Entities;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        string CreateAccessToken(AppUser user);
        string CreateRefreshToken();
    }
}