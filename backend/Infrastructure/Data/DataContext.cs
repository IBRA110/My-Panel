using Core.Entities;
using Core.Helpers;
using Core.Helpers.UlidConverters;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Infrastructure.Data
{
    public class DataContext : IdentityDbContext<AppUserEntity, AppRoleEntity, Ulid, 
        IdentityUserClaim<Ulid>, AppUserRoleEntity, IdentityUserLogin<Ulid>, 
        IdentityRoleClaim<Ulid>, IdentityUserToken<Ulid>>
    {
        public DataContext(DbContextOptions options) : base(options) 
        {

        }
        public DbSet<MessageEntity> Messages { get; set; }
        public DbSet<GroupEntity> Groups { get; set; }
        public DbSet<ConnectionEntity> Connections { get; set; }
        public DbSet<CalendarEventEntity> CalendarEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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
            
            modelBuilder.Entity<MessageEntity>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MessageEntity>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CalendarEventEntity>()
                .HasOne(u => u.Creator);

            modelBuilder.ApplyUtcDateTimeConverter();
            
            UlidToBytesConverter bytesConverter = new UlidToBytesConverter();

            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                

                if (typeof(ConnectionEntity).IsAssignableFrom(entityType.ClrType))
                {
                    modelBuilder.Entity(entityType.ClrType)
                        .Property<Ulid>(nameof(ConnectionEntity.ConnectionId)).ValueGeneratedNever();
                }

                if (typeof(ImageEntity).IsAssignableFrom(entityType.ClrType))
                {
                    modelBuilder.Entity(entityType.ClrType)
                        .Property<Ulid>(nameof(ImageEntity.AppUserId)).ValueGeneratedNever();
                    modelBuilder.Entity(entityType.ClrType)
                        .Property<Ulid>(nameof(ImageEntity.Id)).ValueGeneratedNever();
                }

                if (typeof(MessageEntity).IsAssignableFrom(entityType.ClrType))
                {
                    modelBuilder.Entity(entityType.ClrType)
                        .Property<Ulid>(nameof(MessageEntity.Id)).ValueGeneratedNever();
                    modelBuilder.Entity(entityType.ClrType)
                        .Property<Ulid>(nameof(MessageEntity.RecipientId)).ValueGeneratedNever();
                    modelBuilder.Entity(entityType.ClrType)
                        .Property<Ulid>(nameof(MessageEntity.SenderId)).ValueGeneratedNever();
                }

                if (typeof(CalendarEventEntity).IsAssignableFrom(entityType.ClrType))
                {
                    modelBuilder.Entity(entityType.ClrType)
                        .Property<Ulid>(nameof(CalendarEventEntity.Id)).ValueGeneratedNever();
                }

                foreach (IMutableProperty property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(Ulid) || property.ClrType == typeof(Ulid?))
                    {
                        property.SetValueConverter(bytesConverter);
                    }
                }
            }
        }
    }
}