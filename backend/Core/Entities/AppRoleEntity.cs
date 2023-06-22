using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppRoleEntity : IdentityRole<Ulid>
    {
        public override Ulid Id { get; set; } = Ulid.NewUlid();
        public ICollection<AppUserRoleEntity> UserRoles { get; set; }
    }
}