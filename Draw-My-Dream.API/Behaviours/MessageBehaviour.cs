using API.DTOs;
using API.Helpers;
using API.Interfaces;
using Core.Entities;
using Infrastracture.Data;

namespace API.Behaviours
{
    public class MessageBehaviour : IMessageBehaviour
    {
        private readonly DataContext _context;
        public MessageBehaviour(DataContext context)
        {
            
        }
        public void AddMessage(MessageEntity message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(MessageEntity message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<MessageEntity> GetMessage(Ulid id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public Task<PagedList<MessageDTO>> GetMessagesForUser()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<MessageDTO>> GetMessageThread(Ulid currentUserId, Ulid recipiendId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}