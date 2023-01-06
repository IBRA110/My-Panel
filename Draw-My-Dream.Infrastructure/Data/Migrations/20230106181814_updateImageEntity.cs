using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateImageEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageLikeEntity_Images_ImageEntityId",
                table: "ImageLikeEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ImageLikeEntity",
                table: "ImageLikeEntity");

            migrationBuilder.DropIndex(
                name: "IX_ImageLikeEntity_ImageEntityId",
                table: "ImageLikeEntity");

            migrationBuilder.DropColumn(
                name: "ImageEntityId",
                table: "ImageLikeEntity");

            migrationBuilder.DropColumn(
                name: "id",
                table: "ImageLikeEntity");

            migrationBuilder.RenameTable(
                name: "ImageLikeEntity",
                newName: "Likes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Likes",
                table: "Likes",
                column: "LikedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_LikedImageId",
                table: "Likes",
                column: "LikedImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_Images_LikedImageId",
                table: "Likes",
                column: "LikedImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Likes_Images_LikedImageId",
                table: "Likes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Likes",
                table: "Likes");

            migrationBuilder.DropIndex(
                name: "IX_Likes_LikedImageId",
                table: "Likes");

            migrationBuilder.RenameTable(
                name: "Likes",
                newName: "ImageLikeEntity");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageEntityId",
                table: "ImageLikeEntity",
                type: "BLOB",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "id",
                table: "ImageLikeEntity",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_ImageLikeEntity",
                table: "ImageLikeEntity",
                columns: new[] { "LikedImageId", "LikedUserId" });

            migrationBuilder.CreateIndex(
                name: "IX_ImageLikeEntity_ImageEntityId",
                table: "ImageLikeEntity",
                column: "ImageEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_ImageLikeEntity_Images_ImageEntityId",
                table: "ImageLikeEntity",
                column: "ImageEntityId",
                principalTable: "Images",
                principalColumn: "Id");
        }
    }
}
