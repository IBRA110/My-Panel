using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastracture.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<AppUserEntity> Users { get; set; }
        public DbSet<MessageEntity> Messages { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ImageLikeEntity>().HasKey(like => new { like.LikedUserId });
            
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
            
            var bytesConverter = new UlidToBytesConverter();

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                // Don't use database-generated values for primary keys
                if (typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
                {
                    modelBuilder.Entity(entityType.ClrType)
                        .Property<Ulid>(nameof(BaseEntity.Id)).ValueGeneratedNever();
                }
                if (typeof(ImageEntity).IsAssignableFrom(entityType.ClrType))
                {
                    modelBuilder.Entity(entityType.ClrType)
                        .Property<Ulid>(nameof(ImageEntity.AppUserId)).ValueGeneratedNever();
                }
                if (typeof(MessageEntity).IsAssignableFrom(entityType.ClrType))
                {
                    modelBuilder.Entity(entityType.ClrType)
                        .Property<Ulid>(nameof(MessageEntity.RecipientId)).ValueGeneratedNever();
                    modelBuilder.Entity(entityType.ClrType)
                        .Property<Ulid>(nameof(MessageEntity.SenderId)).ValueGeneratedNever();
                }

                // Convert Ulids to bytea when persisting
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(Ulid) || property.ClrType == typeof(Ulid?))
                    {
                        property.SetValueConverter(bytesConverter);
                    }
                }
            }
        }

        public class UlidToBytesConverter : ValueConverter<Ulid, byte[]>
        {
            private static readonly ConverterMappingHints DefaultHints = new ConverterMappingHints(size: 16);

            public UlidToBytesConverter(ConverterMappingHints mappingHints = null)
                : base(
                        convertToProviderExpression: x => x.ToByteArray(),
                        convertFromProviderExpression: x => new Ulid(x),
                        mappingHints: DefaultHints.With(mappingHints))
            {
            }
        }
    }
}