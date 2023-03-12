using Core.Entities;

namespace Core.DTOs
{
    public class ImageDTO
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public ICollection<ImageLikeEntity> likes { get; set; }
    }
}