using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppUserRoleEntity : IdentityUserRole<int>
    {
        public AppUserEntity User { get; set; }
        public AppRoleEntity Role { get; set; }
    }
}