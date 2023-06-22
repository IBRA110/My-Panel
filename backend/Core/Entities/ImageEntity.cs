namespace Core.Entities
{ 
    public class ImageEntity
    {
        public string Id { get; set; } = Ulid.NewUlid().ToString();
        public string Url { get; set; }
        public AppUserEntity AppUser { get; set; }
        public string AppUserId { get; set; }
        public bool IsMain { get; set; }
        public ICollection<ImageLikeEntity> Likes { get; set; }
    }
}