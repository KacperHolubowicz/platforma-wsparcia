using Microsoft.EntityFrameworkCore.Migrations;

namespace PlatformaWsparciaAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "People",
                columns: table => new
                {
                    PersonID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    Matched = table.Column<bool>(type: "INTEGER", nullable: false),
                    Role = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_People", x => x.PersonID);
                });

            migrationBuilder.CreateTable(
                name: "Classifications",
                columns: table => new
                {
                    LifeSituationClassificationID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Age = table.Column<int>(type: "INTEGER", nullable: false),
                    TownPopulation = table.Column<int>(type: "INTEGER", nullable: false),
                    HouseholdSize = table.Column<int>(type: "INTEGER", nullable: false),
                    FinancialSituation = table.Column<int>(type: "INTEGER", nullable: false),
                    HealthSituation = table.Column<int>(type: "INTEGER", nullable: false),
                    StandardOfLiving = table.Column<int>(type: "INTEGER", nullable: false),
                    FamilySituation = table.Column<int>(type: "INTEGER", nullable: false),
                    ChronicIllnesses = table.Column<bool>(type: "INTEGER", nullable: false),
                    Dependece = table.Column<bool>(type: "INTEGER", nullable: false),
                    PersonID = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classifications", x => x.LifeSituationClassificationID);
                    table.ForeignKey(
                        name: "FK_Classifications_People_PersonID",
                        column: x => x.PersonID,
                        principalTable: "People",
                        principalColumn: "PersonID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContactDetails",
                columns: table => new
                {
                    ContactDetailsID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    PersonID = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactDetails", x => x.ContactDetailsID);
                    table.ForeignKey(
                        name: "FK_ContactDetails_People_PersonID",
                        column: x => x.PersonID,
                        principalTable: "People",
                        principalColumn: "PersonID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LifeSituations",
                columns: table => new
                {
                    LifeSituationID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Priority = table.Column<int>(type: "INTEGER", nullable: false),
                    PersonID = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LifeSituations", x => x.LifeSituationID);
                    table.ForeignKey(
                        name: "FK_LifeSituations_People_PersonID",
                        column: x => x.PersonID,
                        principalTable: "People",
                        principalColumn: "PersonID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Matches",
                columns: table => new
                {
                    MatchID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DonorPersonID = table.Column<int>(type: "INTEGER", nullable: true),
                    PersonInNeedPersonID = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matches", x => x.MatchID);
                    table.ForeignKey(
                        name: "FK_Matches_People_DonorPersonID",
                        column: x => x.DonorPersonID,
                        principalTable: "People",
                        principalColumn: "PersonID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matches_People_PersonInNeedPersonID",
                        column: x => x.PersonInNeedPersonID,
                        principalTable: "People",
                        principalColumn: "PersonID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PersonalDetails",
                columns: table => new
                {
                    PersonalDetailsID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Town = table.Column<string>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    Postcode = table.Column<string>(type: "TEXT", nullable: true),
                    PersonID = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonalDetails", x => x.PersonalDetailsID);
                    table.ForeignKey(
                        name: "FK_PersonalDetails_People_PersonID",
                        column: x => x.PersonID,
                        principalTable: "People",
                        principalColumn: "PersonID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ProductType = table.Column<string>(type: "TEXT", nullable: false),
                    ProductName = table.Column<string>(type: "TEXT", nullable: true),
                    PersonID = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductID);
                    table.ForeignKey(
                        name: "FK_Products_People_PersonID",
                        column: x => x.PersonID,
                        principalTable: "People",
                        principalColumn: "PersonID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Classifications_PersonID",
                table: "Classifications",
                column: "PersonID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ContactDetails_PersonID",
                table: "ContactDetails",
                column: "PersonID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LifeSituations_PersonID",
                table: "LifeSituations",
                column: "PersonID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Matches_DonorPersonID",
                table: "Matches",
                column: "DonorPersonID");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_PersonInNeedPersonID",
                table: "Matches",
                column: "PersonInNeedPersonID");

            migrationBuilder.CreateIndex(
                name: "IX_PersonalDetails_PersonID",
                table: "PersonalDetails",
                column: "PersonID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_PersonID",
                table: "Products",
                column: "PersonID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Classifications");

            migrationBuilder.DropTable(
                name: "ContactDetails");

            migrationBuilder.DropTable(
                name: "LifeSituations");

            migrationBuilder.DropTable(
                name: "Matches");

            migrationBuilder.DropTable(
                name: "PersonalDetails");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "People");
        }
    }
}
