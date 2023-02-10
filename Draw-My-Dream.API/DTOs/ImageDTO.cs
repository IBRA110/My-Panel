using Core.Entities;

namespace API.DTOs
{
    public class ImageDTO
    {
        public string id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public ICollection<ImageLikeEntity> likes { get; set; }
    }
}