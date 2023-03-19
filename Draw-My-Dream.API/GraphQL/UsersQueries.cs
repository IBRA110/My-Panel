using Core.Helpers;
using Core.Entities;
using Infrastructure.Data;
using Core.DTOs;
using Core.Interfaces;
using HotChocolate.Authorization;
using System.Security.Claims;

namespace API.GraphQL
{
    public class UsersQueries
    {
        [UseProjection]
        [UseFiltering()]
        [UseSorting()]
        public IQueryable<AppUserEntity> Users([Service] DataContext context, UserParams userParams)
        {
            return context.Users;
        }

        [Authorize]
        public async Task<AppUserEntity> GetUser([Service] DataContext context, [Service] IUnitOfWork unitOfWork, ClaimsPrincipal claimsPrincipal)
        {
            AppUserEntity user = await unitOfWork.userRepository.GetUserByIdAsync(claimsPrincipal.FindFirst("Id").Value);
            return user;
        }
    }
}