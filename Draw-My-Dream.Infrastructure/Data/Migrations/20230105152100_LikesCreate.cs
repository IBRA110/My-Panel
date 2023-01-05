using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class LikesCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Photos");

            migrationBuilder.CreateTable(
                name: "ImageLikeEntity",
                columns: table => new
                {
                    LikedUserId = table.Column<byte[]>(type: "BLOB", nullable: false),
                    LikedImageId = table.Column<byte[]>(type: "BLOB", nullable: false),
                    PhotoEntityId = table.Column<byte[]>(type: "BLOB", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageLikeEntity", x => new { x.LikedImageId, x.LikedUserId });
                    table.ForeignKey(
                        name: "FK_ImageLikeEntity_Photos_PhotoEntityId",
                        column: x => x.PhotoEntityId,
                        principalTable: "Photos",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImageLikeEntity_PhotoEntityId",
                table: "ImageLikeEntity",
                column: "PhotoEntityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImageLikeEntity");

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Photos",
                type: "TEXT",
                nullable: true);
        }
    }
}
