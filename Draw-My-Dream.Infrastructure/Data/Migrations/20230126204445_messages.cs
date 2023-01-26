using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class messages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Likes_Images_LikedImageId",
                table: "Likes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Likes",
                table: "Likes");

            migrationBuilder.RenameTable(
                name: "Likes",
                newName: "ImageLikeEntity");

            migrationBuilder.RenameIndex(
                name: "IX_Likes_LikedImageId",
                table: "ImageLikeEntity",
                newName: "IX_ImageLikeEntity_LikedImageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ImageLikeEntity",
                table: "ImageLikeEntity",
                column: "LikedUserId");

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<byte[]>(type: "BLOB", nullable: false),
                    SenderId = table.Column<byte[]>(type: "BLOB", nullable: false),
                    SenderUserName = table.Column<string>(type: "TEXT", nullable: true),
                    RecipientId = table.Column<byte[]>(type: "BLOB", nullable: false),
                    RecipientUserName = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    DateRead = table.Column<DateTime>(type: "TEXT", nullable: true),
                    MessageSent = table.Column<DateTime>(type: "TEXT", nullable: false),
                    SenderDeleted = table.Column<bool>(type: "INTEGER", nullable: false),
                    RecipientDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_Users_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Messages_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_RecipientId",
                table: "Messages",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                column: "SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_ImageLikeEntity_Images_LikedImageId",
                table: "ImageLikeEntity",
                column: "LikedImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageLikeEntity_Images_LikedImageId",
                table: "ImageLikeEntity");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ImageLikeEntity",
                table: "ImageLikeEntity");

            migrationBuilder.RenameTable(
                name: "ImageLikeEntity",
                newName: "Likes");

            migrationBuilder.RenameIndex(
                name: "IX_ImageLikeEntity_LikedImageId",
                table: "Likes",
                newName: "IX_Likes_LikedImageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Likes",
                table: "Likes",
                column: "LikedUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_Images_LikedImageId",
                table: "Likes",
                column: "LikedImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
