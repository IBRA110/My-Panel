using Core.DTOs.UserDTOs;
using Core.Interfaces;
using HotChocolate.Authorization;
using System.Security.Claims;

namespace API.GraphQL.Users
{
    [ExtendObjectType("Queries")]
    public class UsersQueries
    {
        [UseProjection]
        [Authorize]
        public async Task<MemberDTO> GetUser([Service] IUnitOfWork unitOfWork, ClaimsPrincipal claimsPrincipal)
        {
            MemberDTO user = await unitOfWork.userRepository.GetMemberByIdAsync(Ulid.Parse(claimsPrincipal.FindFirst("Id").Value));
            return user;
        }
        
        [UseProjection]
        [Authorize]
        public async Task<MemberDTO> GetMember([Service] IUnitOfWork unitOfWork, string userName)
        {
            MemberDTO user = await unitOfWork.userRepository.GetMemberAsync(userName);
            return user;
        }

        [UseProjection]
        [Authorize]
        public async Task<List<MemberDTO>> GetUsers(
            [Service] IUnitOfWork unitOfWork, 
            ClaimsPrincipal claimsPrincipal, 
            string userName)
        {
            Ulid id = Ulid.Parse(claimsPrincipal.FindFirst("Id").Value);

            List<MemberDTO> users = await unitOfWork.userRepository.GetMembersAsyncGraphQL(userName, id);

            return users;
        }
    }
}
