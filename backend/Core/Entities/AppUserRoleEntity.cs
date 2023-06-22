using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppUserRoleEntity : IdentityUserRole<Ulid>
    {
        public AppUserEntity User { get; set; }
        public AppRoleEntity Role { get; set; }
    }
}