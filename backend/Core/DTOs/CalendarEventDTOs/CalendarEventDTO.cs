namespace Core.DTOs.CalendarEventDTOs
{
    public class CalendarEventDTO
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string CreatorUserName { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime DateUpdated { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Color { get; set; }
    }
}
