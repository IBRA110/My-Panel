using Core.DTOs.UserDTOs;
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
        Task<List<MemberDTO>> GetMembersAsyncGraphQL(string? userName, Ulid id);
        Task<MemberDTO> GetMemberAsync(string username);
        Task<MemberDTO> GetMemberByIdAsync(Ulid id);
    }
}
