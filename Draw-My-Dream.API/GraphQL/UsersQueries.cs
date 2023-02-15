using API.Helpers;
using API.Interfaces;
using Core.Entities;
using Infrastracture.Data;

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