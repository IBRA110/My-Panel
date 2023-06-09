using Core.Helpers;
using Core.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Core.DTOs.MessageDTOs;

namespace Infrastructure.Data.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MessageRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddGroup(GroupEntity group)
        {
            _context.Groups.Add(group);
        }

        public void RemoveConnection(ConnectionEntity connection)
        {
            _context.Connections.Remove(connection);
        }

        public async Task<ConnectionEntity> GetConnection(string connectionId)
        {
            return await _context.Connections.FindAsync(connectionId);
        }

        public async Task<GroupEntity> GetMessageGroup(string groupName)
        {
            return await _context.Groups
                .Include(x => x.Connections)
                .FirstOrDefaultAsync(x => x.Name == groupName);
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
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<PagedList<MessageDTO>> GetMessagesForUser(MessageParams messageParams)
        {
            IQueryable<MessageDTO> query = _context.Messages
                .OrderByDescending(m => m.MessageSent)
                .ProjectTo<MessageDTO>(_mapper.ConfigurationProvider)
                .AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.RecipientUserName == messageParams.UserName &&
                    u.RecipientDeleted == false),
                "Outbox" => query.Where(u => u.SenderUserName == messageParams.UserName &&
                    u.SenderDeleted == false),
                _ => query.Where(u => u.RecipientUserName ==
                    messageParams.UserName && u.RecipientDeleted == false && u.DateRead == null)
            };

            return await PagedList<MessageDTO>.CreateAsync(query, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<MessageDTO>> GetMessageThread(string currentUserName, string recipientUserName)
        {
            List<MessageDTO> messages = await _context.Messages
                .Where(m => m.Recipient.UserName == currentUserName && m.RecipientDeleted == false
                    && m.Sender.UserName == recipientUserName
                    || m.Recipient.UserName == recipientUserName
                    && m.Sender.UserName == currentUserName && m.SenderDeleted == false
                )
                .MarkUnreadAsRead(currentUserName)
                .OrderBy(m => m.MessageSent)
                .ProjectTo<MessageDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return messages;
        }

        public async Task<GroupEntity> GetGroupForConnection(string connectionId)
        {
            return await _context.Groups
                .Include(c => c.Connections)
                .Where(c => c.Connections.Any(x => x.ConnectionId == connectionId))
                .FirstOrDefaultAsync();
        }

        public async Task<CountOfUnreadMessages> GetCountOfUnreadMessages(string userName)
        {
            List<MessageDTO> messages = await _context.Messages
                .Where(m => m.RecipientUserName == userName && m.DateRead == null)
                .ProjectTo<MessageDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();

            CountOfUnreadMessages unreadMessages = new CountOfUnreadMessages(messages.Count);
                        
            messages.ForEach(m =>
            {
                if (unreadMessages.CountBySender.ContainsKey(m.SenderUserName) == true)
                {
                    unreadMessages.CountBySender[m.SenderUserName] += 1;
                }
                else
                {
                    unreadMessages.CountBySender.Add(m.SenderUserName, 1);
                }
            });

            return unreadMessages;
        }
    }
}