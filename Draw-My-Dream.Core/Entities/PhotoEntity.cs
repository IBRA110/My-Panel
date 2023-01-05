using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    [Table("Photos")]
    public class PhotoEntity : ImageEntity
    {
        public bool IsMain { get; set; }
        public ICollection<ImageLikeEntity> LikedImages { get; set; }
    }
}