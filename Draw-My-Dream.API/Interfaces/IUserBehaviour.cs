using API.DTOs;
using Core.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserBehaviour
    {
        void Update(AppUserEntity user);
        Task<AppUserEntity> GetUserByIdAsync(string id);
        Task<AppUserEntity> GetUserByUsernameAsync(string username);
        Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams);
        Task<MemberDTO> GetMemberAsync(string username);
    }
}
