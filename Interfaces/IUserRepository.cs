using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUserEntity user);
        Task<bool> SaveAllAsync();
        Task<AppUserEntity> GetUserByIdAsync(Ulid id);
        Task<PagedList<MemberDTO>> GetMembersAsync(UserParams params);
        Task<MemberDTO> GetMemberAsync(string username);
    }
}
