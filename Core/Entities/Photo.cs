namespace Core.Entities
{
    public class Photo : Image
    {
        public bool IsMain { get; set; }
        public string PublicId { get; set;}
    }
}