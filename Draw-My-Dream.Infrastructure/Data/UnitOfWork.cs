using Core.Interfaces;
using AutoMapper;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly UserManager<AppUserEntity> _userManager;
        public UnitOfWork(DataContext context, IMapper mapper, UserManager<AppUserEntity> userManager)
        {
            _mapper = mapper;
            _context = context;
            _userManager = userManager;

        }
        public IUserRepository userRepository => new UserRepository(_context, _mapper);

        public IMessageRepository messageRepository => new MessageRepository(_context, _mapper);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
        public async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }

        public async Task<bool> EmailExists(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email);
        }
    }
}