using Core.Entities;

namespace Core.DTOs.ImageDTOs
{
    public class ImageDTO
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
    }
}