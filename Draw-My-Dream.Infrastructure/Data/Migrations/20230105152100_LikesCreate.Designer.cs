﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230105152100_LikesCreate")]
    partial class LikesCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.0");

            modelBuilder.Entity("Core.Entities.AppUserEntity", b =>
                {
                    b.Property<byte[]>("Id")
                        .HasColumnType("BLOB");

                    b.Property<string>("City")
                        .HasColumnType("TEXT");

                    b.Property<string>("Country")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Gender")
                        .HasColumnType("TEXT");

                    b.Property<string>("Interests")
                        .HasColumnType("TEXT");

                    b.Property<string>("Introduction")
                        .HasColumnType("TEXT");

                    b.Property<string>("KnownAs")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("BLOB");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Core.Entities.DrawingEntity", b =>
                {
                    b.Property<byte[]>("Id")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("AppUserId")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<string>("Url")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("Drawings");
                });

            modelBuilder.Entity("Core.Entities.ImageLikeEntity", b =>
                {
                    b.Property<byte[]>("LikedImageId")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("LikedUserId")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PhotoEntityId")
                        .HasColumnType("BLOB");

                    b.HasKey("LikedImageId", "LikedUserId");

                    b.HasIndex("PhotoEntityId");

                    b.ToTable("ImageLikeEntity");
                });

            modelBuilder.Entity("Core.Entities.PhotoEntity", b =>
                {
                    b.Property<byte[]>("Id")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("AppUserId")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<bool>("IsMain")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Url")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("Core.Entities.DrawingEntity", b =>
                {
                    b.HasOne("Core.Entities.AppUserEntity", "AppUser")
                        .WithMany("Pictures")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Core.Entities.ImageLikeEntity", b =>
                {
                    b.HasOne("Core.Entities.PhotoEntity", null)
                        .WithMany("LikedImages")
                        .HasForeignKey("PhotoEntityId");
                });

            modelBuilder.Entity("Core.Entities.PhotoEntity", b =>
                {
                    b.HasOne("Core.Entities.AppUserEntity", "AppUser")
                        .WithMany("Photos")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Core.Entities.AppUserEntity", b =>
                {
                    b.Navigation("Photos");

                    b.Navigation("Pictures");
                });

            modelBuilder.Entity("Core.Entities.PhotoEntity", b =>
                {
                    b.Navigation("LikedImages");
                });
#pragma warning restore 612, 618
        }
    }
}
