using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    [Table("Photos")]
    public class Photo : ImageEntity
    {
        public bool IsMain { get; set; }
        public string PublicId { get; set;}
    }
}