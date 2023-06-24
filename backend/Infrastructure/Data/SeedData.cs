using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Infrastructure.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUserEntity> userManager, RoleManager<AppRoleEntity> roleManager)
        {
            if (await userManager.Users.AnyAsync())
            {
                return;
            }
            
            string userData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData.json");
            
            List<AppUserEntity> users = JsonSerializer.Deserialize<List<AppUserEntity>>(userData);

            List<AppRoleEntity> roles = new List<AppRoleEntity>
            {
                new AppRoleEntity { Name = "Admin" },
                new AppRoleEntity { Name = "Moderator" },
                new AppRoleEntity { Name = "Member" },
            };

            foreach (AppRoleEntity role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");
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