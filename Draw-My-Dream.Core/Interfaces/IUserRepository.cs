using Core.DTOs;
using Core.Entities;
using Core.Helpers;

namespace Core.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUserEntity user);
        Task<AppUserEntity> GetUserByIdAsync(Ulid id);
        Task<AppUserEntity> GetUserByUsernameAsync(string username);
        Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams);
        Task<MemberDTO> GetMemberAsync(string username);
    }
}
