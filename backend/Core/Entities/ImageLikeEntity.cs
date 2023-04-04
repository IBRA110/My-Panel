namespace Core.Entities
{
    public class ImageLikeEntity
    {
        public string LikedUserId { get; set; }
        public string LikedImageId { get; set; }
        public ImageEntity Image { get; set; }
    }
}