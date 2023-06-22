using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class CreatedCalendarEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageLikeEntity_Images_LikedImageId",
                table: "ImageLikeEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_AspNetUsers_AppUserId",
                table: "Images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Images",
                table: "Images");

            migrationBuilder.RenameTable(
                name: "Images",
                newName: "ImageEntity");

            migrationBuilder.RenameIndex(
                name: "IX_Images_AppUserId",
                table: "ImageEntity",
                newName: "IX_ImageEntity_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ImageEntity",
                table: "ImageEntity",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "CalendarEvents",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatorId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DateCreated = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DateUpdated = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    startDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    endDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    startTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    endTime = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalendarEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CalendarEvents_AspNetUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_CalendarEvents_CreatorId",
                table: "CalendarEvents",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ImageEntity_AspNetUsers_AppUserId",
                table: "ImageEntity",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ImageLikeEntity_ImageEntity_LikedImageId",
                table: "ImageLikeEntity",
                column: "LikedImageId",
                principalTable: "ImageEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageEntity_AspNetUsers_AppUserId",
                table: "ImageEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_ImageLikeEntity_ImageEntity_LikedImageId",
                table: "ImageLikeEntity");

            migrationBuilder.DropTable(
                name: "CalendarEvents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ImageEntity",
                table: "ImageEntity");

            migrationBuilder.RenameTable(
                name: "ImageEntity",
                newName: "Images");

            migrationBuilder.RenameIndex(
                name: "IX_ImageEntity_AppUserId",
                table: "Images",
                newName: "IX_Images_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Images",
                table: "Images",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ImageLikeEntity_Images_LikedImageId",
                table: "ImageLikeEntity",
                column: "LikedImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_AspNetUsers_AppUserId",
                table: "Images",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
