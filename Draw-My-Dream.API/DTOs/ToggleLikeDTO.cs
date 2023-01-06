namespace API.DTOs
{
    public class ToggleLikeDTO
    {
        public Ulid ImageOwnerId { get; set; }
        public Ulid ImageId { get; set; }
    }
}