using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class GroupEntity
    {
        public GroupEntity()
        {
        }
        public GroupEntity(string name)
        {
            Name = name;
        }
        [Key]
        public string Name { get; set; }

        public ICollection<ConnectionEntity> Connections { get; set; } = new List<ConnectionEntity>();
    }
}