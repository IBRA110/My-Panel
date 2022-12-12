using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public interface IEntity
    {
        public Ulid Id { get; set; }
    }
    public class AppUser : IEntity
    {
        [Key]
        public Ulid Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string RefreshToken { get; set; }
    }
}