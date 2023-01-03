namespace API.DTOs
{
    public class PhotoDTO
    {
        public Ulid id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set;}
        
    }
}