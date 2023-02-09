using API.DTOs;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Entities;
using Infrastracture.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Behaviours
{
    public class MessageBehaviour : IMessageBehaviour
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MessageBehaviour(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
            return await _context.Messages
                .Include(u => u.Sender)
                .Include(u => u.Recipient)
                .SingleOrDefaultAsync(x => x.MessageId == id);
        }

        public async Task<PagedList<MessageDTO>> GetMessagesForUser(MessageParams messageParams)
        {
            IQueryable<MessageEntity> query = _context.Messages
                .OrderByDescending(m => m.MessageSent)
                .AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.Recipient.UserName == messageParams.UserName && 
                    u.RecipientDeleted == false),
                "Outbox" => query.Where(u => u.Sender.UserName == messageParams.UserName &&
                    u.SenderDeleted == false),
                _ => query.Where(u => u.Recipient.UserName == 
                    messageParams.UserName && u.RecipientDeleted == false && u.DateRead == null)
            };

            IQueryable<MessageDTO> messages = query.ProjectTo<MessageDTO>(_mapper.ConfigurationProvider);

            return await PagedList<MessageDTO>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<MessageDTO>> GetMessageThread(string currentUserName, string recipientUserName)
        {
            List<MessageEntity> messages = await _context.Messages
                .Include(u => u.Sender).ThenInclude(p => p.Images)
                .Include(u => u.Recipient).ThenInclude(p => p.Images)
                .Where(m => m.Recipient.UserName == currentUserName && m.RecipientDeleted == false
                    && m.Sender.UserName == recipientUserName
                    || m.Recipient.UserName == recipientUserName
                    && m.Sender.UserName == currentUserName && m.SenderDeleted == false
                )
                .OrderBy(m => m.MessageSent)
                .ToListAsync();
            
            List<MessageEntity> unreadMessages = messages.Where(m => m.DateRead == null 
                && m.Recipient.UserName == currentUserName).ToList();
            
            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.Now;
                }

                await _context.SaveChangesAsync();
            }

            return _mapper.Map<IEnumerable<MessageDTO>>(messages);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}