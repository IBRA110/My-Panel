using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUserEntity user);
        Task<bool> SaveAllAsync();
        Task<AppUserEntity> GetUserByIdAsync(Ulid id);
        Task<IEnumerable<MemberDTO>> GetMembersAsync();
        Task<MemberDTO> GetMemberAsync(string username);
    }
}