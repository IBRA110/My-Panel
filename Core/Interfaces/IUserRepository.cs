using Core.Entities;

namespace Core.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<AppUser>> GetUsersAsync();
        
        Task<AppUser> GetUserByIdAsync(Ulid id);
        
        Task<AppUser> GetUserByUsernameAsync(string username);
    }
}
