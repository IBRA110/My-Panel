using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class ConnectionEntity
    {
        public ConnectionEntity()
        {         
        }
        public ConnectionEntity(string connectionId, string userName)
        {
            ConnectionId = connectionId;
            UserName = userName;
        }
        [Key]
        public string ConnectionId { get; set; }
        public string UserName { get; set; }
    }
}