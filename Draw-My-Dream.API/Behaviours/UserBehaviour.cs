using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using API.DTOs;
using API.Helpers;
using API.Interfaces;
using Infrastracture.Data;
using Core.Entities;

namespace API.Behaviours
{
    public class UserBehaviour : IUserInterface
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserBehaviour(DataContext context, IMapper mapper)
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

        public async Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams)
        {
            IQueryable<MemberDTO> query = _context.Users
                .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
                .AsNoTracking();
            return await PagedList<MemberDTO>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<AppUserEntity> GetUserByIdAsync(Ulid id)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.Id == id);
        }
        public async Task<AppUserEntity> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUserEntity user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
