using API.Interfaces;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<AppUserEntity> GetUserByIdAsync(Ulid id)
        {
            return await _context.Users.FindAsync(id);
        }
         
        public async Task<AppUserEntity> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .Include(p => p.Pictures)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUserEntity>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .Include(p => p.Pictures)
                .ToListAsync();
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
