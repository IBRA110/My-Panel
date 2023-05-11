using Core.Helpers;
using Core.Entities;
using Core.DTOs.MessageDTOs;

namespace Core.Interfaces
{
    public interface IMessageRepository
    {
        void AddGroup(GroupEntity group);
        void RemoveConnection(ConnectionEntity connection);
        Task<ConnectionEntity> GetConnection(string connectionId);
        Task<GroupEntity> GetMessageGroup(string groupName);
        Task<GroupEntity> GetGroupForConnection(string connectionId);
        void AddMessage(MessageEntity message);
        void DeleteMessage(MessageEntity message);
        Task<MessageEntity> GetMessage(string id);
        Task<PagedList<MessageDTO>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDTO>> GetMessageThread(string currentUserName, string recipientUserName);
    }
}