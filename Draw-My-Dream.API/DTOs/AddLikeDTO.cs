namespace API.DTOs
{
    public class AddLikeDTO
    {
        public Ulid LikedUserId { get; set; }
        public Ulid ImageOwnerId { get; set; }
        public Ulid ImageId { get; set; }
    }
}