using API.Interfaces;
using AutoMapper;
using Infrastracture.Data;

namespace API.Behaviours
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

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
    }
}