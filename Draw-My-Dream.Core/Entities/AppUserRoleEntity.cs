using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppUserRoleEntity : IdentityUserRole<string>
    {
        public AppUserEntity User { get; set; }
        public AppRoleEntity Role { get; set; }
    }
}