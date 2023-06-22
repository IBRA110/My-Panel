namespace Core.Entities
{
    public class CalendarEventEntity
    {
        public string Id { get; set; } = Ulid.NewUlid().ToString();
        public string Title { get; set; }
        public AppUserEntity Creator { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime DateUpdated { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public DateTime startTime { get; set; }
        public DateTime endTime { get; set; }

    }
}
