namespace Core.Entities
{
    public class ImageEntity : BaseEntity
    {
        public string Url { get; set; }
        public AppUserEntity AppUser { get; set; }
        public Ulid AppUserId { get; set; }
    }
}