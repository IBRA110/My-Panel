using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppUserEntity : IdentityUser<string>
    {
        public override string Id { get; set; } = Ulid.NewUlid().ToString();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string RefreshToken { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<ImageEntity> Images { get; set; }
        public ICollection<MessageEntity> MessagesSent { get; set; }
        public ICollection<MessageEntity> MessagesReceived { get; set; }
        public ICollection<AppUserRoleEntity> UserRoles { get; set; }
    }
}
