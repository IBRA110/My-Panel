using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastracture.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUserEntity> userManager, RoleManager<AppRoleEntity> roleManager)
        {
            if (await userManager.Users.AnyAsync())
            {
                return;
            }

            List<AppRoleEntity> roles = new List<AppRoleEntity>
            {
                new AppRoleEntity { Name = "Admin" },
                new AppRoleEntity { Name = "Moderator" },
                new AppRoleEntity { Name = "Member" },
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            AppUserEntity admin = new AppUserEntity
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "9i3KsZ0jR2mA1*");
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
        }
    }
}