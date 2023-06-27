namespace Core.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository userRepository { get; }
        IMessageRepository messageRepository { get; }
        ICalendarEventRepository CalendarEvent { get; }
        Task<bool> Complete();
        bool HasChanges();
        Task<bool> UserExists(string username);
        Task<bool> EmailExists(string email);
    }
}