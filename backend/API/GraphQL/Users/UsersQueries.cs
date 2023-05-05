using Core.DTOs;
using Core.Interfaces;
using HotChocolate.Authorization;
using System.Security.Claims;

namespace API.GraphQL.Users
{
    [ExtendObjectType("Query")]
    public class UsersQueries
    {
        [UseProjection]
        [Authorize]
        public async Task<MemberDTO> GetUser([Service] IUnitOfWork unitOfWork, ClaimsPrincipal claimsPrincipal)
        {
            MemberDTO user = await unitOfWork.userRepository.GetMemberByIdAsync(claimsPrincipal.FindFirst("Id").Value);
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
        public async Task<IQueryable<MemberDTO>> GetUsers(
            [Service] IUnitOfWork unitOfWork, 
            ClaimsPrincipal claimsPrincipal, 
            string? userName)
        {
            string id = claimsPrincipal.FindFirst("Id").Value;

            IQueryable<MemberDTO> users = await unitOfWork.userRepository.GetMembersAsyncGraphQL(userName, id);

            return users;
        }
    }
}
