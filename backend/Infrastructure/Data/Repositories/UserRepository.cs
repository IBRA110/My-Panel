using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using Core.Helpers;
using Core.Interfaces;
using Core.Entities;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Core.DTOs.UserDTOs;

namespace Infrastructure.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDTO> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<MemberDTO> GetMemberByIdAsync(string id)
        {
            return await _context.Users
                 .Where(x => x.Id == id)
                 .Include(p => p.Images).ThenInclude(subItem => subItem.Likes)
                 .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
                 .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams)
        {
            IQueryable<AppUserEntity> query = _context.Users.AsQueryable();

            query = query.Where(u => u.UserName != userParams.CurrentUsername);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            return await PagedList<MemberDTO>.CreateAsync(query.ProjectTo<MemberDTO>(_mapper
                .ConfigurationProvider).AsNoTracking(),
                    userParams.PageNumber, userParams.PageSize);
        }

        public async Task<AppUserEntity> GetUserByIdAsync(string id)
        {
            return await _context.Users
                .Include(p => p.Images).ThenInclude(subItem => subItem.Likes)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<AppUserEntity> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Images)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IQueryable<MemberDTO>> GetMembersAsyncGraphQL(string userName, string id)
        {
            IQueryable<MemberDTO> users = _context.Users
                    .AsQueryable()
                    .Where(x => x.Id != id)
                    .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider);

            if (!string.IsNullOrEmpty(userName))
            {
                users = users.Where(e => e.UserName.Contains(userName) 
                    || e.FirstName.Contains(userName) 
                    || e.LastName.Contains(userName));
            }

            return users;
        }

        public void Update(AppUserEntity user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
