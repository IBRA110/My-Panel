namespace Core.Entities
{
    public class ImageEntity : BaseEntity
    {
        public string Url { get; set; }
        public AppUser AppUser { get; set; }
        public Ulid AppUserId { get; set; }
    }
}