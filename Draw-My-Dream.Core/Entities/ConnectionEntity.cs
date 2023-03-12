using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class ConnectionEntity
    {
        public ConnectionEntity()
        {         
        }
        public ConnectionEntity(Ulid connectionId, string userName)
        {
            ConnectionId = connectionId;
            UserName = userName;
        }
        [Key]
        public Ulid ConnectionId { get; set; }
        public string UserName { get; set; }
    }
}