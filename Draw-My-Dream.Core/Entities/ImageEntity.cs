using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    [Table("Images")]
    public class ImageEntity : BaseEntity
    {
        public string Url { get; set; }
        public AppUserEntity AppUser { get; set; }
        public Ulid AppUserId { get; set; }
        public bool IsMain { get; set; }
        public ICollection<ImageLikeEntity> Likes { get; set; }
    }
}