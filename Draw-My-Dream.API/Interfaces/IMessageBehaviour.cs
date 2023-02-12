using API.DTOs;
using API.Helpers;
using Core.Entities;

namespace API.Interfaces
{
    public interface IMessageBehaviour
    {
        void AddGroup(GroupEntity group);
        void RemoveConnection(ConnectionEntity connection);
        Task<ConnectionEntity> GetConnection(string connectionId);
        Task<GroupEntity> GetMessageGroup(string groupName);
        void AddMessage(MessageEntity message);
        void DeleteMessage(MessageEntity message);
        Task<MessageEntity> GetMessage(string id);
        Task<PagedList<MessageDTO>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDTO>> GetMessageThread(string currentUserName, string recipiendUserName);
        Task<bool> SaveAllAsync();
    }
}