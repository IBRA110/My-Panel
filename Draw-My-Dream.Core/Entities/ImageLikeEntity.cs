namespace Core.Entities
{
    public class ImageLikeEntity
    {
        public Ulid LikedUserId { get; set; }
        public Ulid LikedImageId { get; set; }
    }
}