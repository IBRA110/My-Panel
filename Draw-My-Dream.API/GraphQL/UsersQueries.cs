using API.Helpers;
using API.Interfaces;
using Core.Entities;
using Infrastracture.Data;

namespace API.GraphQL
{
    public class UsersQueries
    {
        private readonly IUnitOfWork _unitOfWork;
        public UsersQueries(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [UseProjection]
        [UseFiltering()]
        [UseSorting()]
        public IQueryable<AppUserEntity> Users([Service] DataContext context, UserParams userParams)
        {
            return context.Users;
        }
    }
}