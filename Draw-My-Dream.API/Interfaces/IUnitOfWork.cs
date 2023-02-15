namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserBehaviour userBehaviour { get; }
        IMessageBehaviour messageBehaviour { get; }
        Task<bool> Complete();
        bool HasChanges();
        Task<bool> UserExists(string username);
        Task<bool> EmailExists(string email);
    }
}