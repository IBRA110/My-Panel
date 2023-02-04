using API.DTOs;
using API.Helpers;
using Core.Entities;

namespace API.Interfaces
{
    public interface IMessageBehaviour
    {
        void AddMessage(MessageEntity message);
        void DeleteMessage(MessageEntity message);
        Task<MessageEntity> GetMessage(Ulid id);
        Task<PagedList<MessageDTO>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDTO>> GetMessageThread(string currentUserName, string recipiendUserName);
        Task<bool> SaveAllAsync();
    }
}