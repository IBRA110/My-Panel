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
    }
}