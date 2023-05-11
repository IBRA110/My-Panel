namespace Core.DTOs.MessageDTOs
{
    public class CountOfUnreadMessages
    {
        public int TotalCount { get; set; }
        public IEnumerable<CountBySender> CountBySender { get; set; }
    }

    public class CountBySender
    {
        public string SenderName { get; set; }
        public int Count { get; set; }
    }
}
