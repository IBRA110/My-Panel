namespace Core.DTOs.MessageDTOs
{
    public class CountOfUnreadMessages
    {
        public CountOfUnreadMessages(int count) 
        {
            TotalCount = count;
        }
        public int TotalCount { get; set; }
        public Dictionary<string, int> CountBySender { get; set; } = new Dictionary<string, int>();
    }
}
