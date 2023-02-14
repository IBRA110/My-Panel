using Core.Entities;
using Infrastracture.Data;

namespace API.GraphQL
{
    public class Queries
    {
        public IQueryable<AppUserEntity> Users([Service] DataContext context)
        {
            return context.Users;
        }
    }
}