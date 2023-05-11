using Core.Entities;

namespace Core.Helpers
{
    public static class ReadingMessage
    {
        public static IQueryable<MessageEntity> MarkUnreadAsRead(this IQueryable<MessageEntity> query, string currentUsername)
        {
            var unreadMessages = query.Where(m => m.DateRead == null
                && m.RecipientUserName == currentUsername);

            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.UtcNow;
                }
            }

            return query;
        }
    }
}
