using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class RefactoringImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageLikeEntity_Photos_PhotoEntityId",
                table: "ImageLikeEntity");

            migrationBuilder.DropTable(
                name: "Drawings");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.RenameColumn(
                name: "PhotoEntityId",
                table: "ImageLikeEntity",
                newName: "ImageEntityId");

            migrationBuilder.RenameIndex(
                name: "IX_ImageLikeEntity_PhotoEntityId",
                table: "ImageLikeEntity",
                newName: "IX_ImageLikeEntity_ImageEntityId");

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<byte[]>(type: "BLOB", nullable: false),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    AppUserId = table.Column<byte[]>(type: "BLOB", nullable: false),
                    IsMain = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_Users_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_AppUserId",
                table: "Images",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ImageLikeEntity_Images_ImageEntityId",
                table: "ImageLikeEntity",
                column: "ImageEntityId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageLikeEntity_Images_ImageEntityId",
                table: "ImageLikeEntity");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.RenameColumn(
                name: "ImageEntityId",
                table: "ImageLikeEntity",
                newName: "PhotoEntityId");

            migrationBuilder.RenameIndex(
                name: "IX_ImageLikeEntity_ImageEntityId",
                table: "ImageLikeEntity",
                newName: "IX_ImageLikeEntity_PhotoEntityId");

            migrationBuilder.CreateTable(
                name: "Drawings",
                columns: table => new
                {
                    Id = table.Column<byte[]>(type: "BLOB", nullable: false),
                    AppUserId = table.Column<byte[]>(type: "BLOB", nullable: false),
                    Url = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drawings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Drawings_Users_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<byte[]>(type: "BLOB", nullable: false),
                    AppUserId = table.Column<byte[]>(type: "BLOB", nullable: false),
                    IsMain = table.Column<bool>(type: "INTEGER", nullable: false),
                    Url = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_Users_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Drawings_AppUserId",
                table: "Drawings",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_AppUserId",
                table: "Photos",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ImageLikeEntity_Photos_PhotoEntityId",
                table: "ImageLikeEntity",
                column: "PhotoEntityId",
                principalTable: "Photos",
                principalColumn: "Id");
        }
    }
}
