namespace API.DTOs
{
    public class ImageDTO
    {
        public Ulid id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set;}
        
    }
}