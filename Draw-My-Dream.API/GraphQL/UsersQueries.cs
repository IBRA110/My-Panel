using API.Helpers;
using Core.Entities;
using Infrastructure.Data;

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
    }
}