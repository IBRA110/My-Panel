using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class RemovedFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KnownAs",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "startTime",
                table: "CalendarEvents",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "startDate",
                table: "CalendarEvents",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "endTime",
                table: "CalendarEvents",
                newName: "EndTime");

            migrationBuilder.RenameColumn(
                name: "endDate",
                table: "CalendarEvents",
                newName: "EndDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "CalendarEvents",
                newName: "startTime");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "CalendarEvents",
                newName: "startDate");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "CalendarEvents",
                newName: "endTime");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "CalendarEvents",
                newName: "endDate");

            migrationBuilder.AddColumn<string>(
                name: "KnownAs",
                table: "AspNetUsers",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
