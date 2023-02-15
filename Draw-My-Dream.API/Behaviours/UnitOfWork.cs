using API.Interfaces;
using AutoMapper;
using Core.Entities;
using Infrastracture.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Behaviours
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
        public IUserBehaviour userBehaviour => new UserBehaviour(_context, _mapper);

        public IMessageBehaviour messageBehaviour => new MessageBehaviour(_context, _mapper);

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