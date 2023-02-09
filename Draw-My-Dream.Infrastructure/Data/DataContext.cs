using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastracture.Data
{
    public class DataContext : IdentityDbContext<AppUserEntity, AppRoleEntity, string, 
        IdentityUserClaim<string>, AppUserRoleEntity, IdentityUserLogin<string>, 
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public DataContext(DbContextOptions options) : base(options) 
        {

        }
        public DbSet<MessageEntity> Messages { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ImageLikeEntity>().HasKey(like => new { like.LikedUserId });

            modelBuilder.Entity<AppUserEntity>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
            
            modelBuilder.Entity<AppRoleEntity>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
            
            modelBuilder.Entity<ImageLikeEntity>()
                .HasOne(s => s.Image)
                .WithMany(l => l.Likes)
                .HasForeignKey(s => s.LikedImageId)
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<MessageEntity>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesRecevied)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MessageEntity>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);
            
        }
    }
}