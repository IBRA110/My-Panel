using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class AppRoleEntity : IdentityRole<int>
    {
        public ICollection<AppUserRoleEntity> UserRoles { get; set; }
    }
}