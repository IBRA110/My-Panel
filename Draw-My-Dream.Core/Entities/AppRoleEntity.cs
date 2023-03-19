using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppRoleEntity : IdentityRole<string>
    {
        public override string Id { get; set; } = Ulid.NewUlid().ToString();
        public ICollection<AppUserRoleEntity> UserRoles { get; set; }
    }
}