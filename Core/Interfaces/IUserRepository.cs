using Core.Entities;

namespace Core.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUserEntity user);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<AppUserEntity>> GetUsersAsync();
        
        Task<AppUserEntity> GetUserByIdAsync(Ulid id);
        
        Task<AppUserEntity> GetUserByUsernameAsync(string username);
    }
}
