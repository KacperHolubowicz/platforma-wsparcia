﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PlatformaWsparciaAPI.Data;

namespace PlatformaWsparciaAPI.Migrations
{
    [DbContext(typeof(ProjectDbContext))]
    partial class ProjectDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.12");

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.ContactDetails", b =>
                {
                    b.Property<int>("ContactDetailsID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<int>("PersonID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ContactDetailsID");

                    b.HasIndex("PersonID")
                        .IsUnique();

                    b.ToTable("ContactDetails");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.LifeSituation", b =>
                {
                    b.Property<int>("LifeSituationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<int>("PersonID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Priority")
                        .HasColumnType("INTEGER");

                    b.HasKey("LifeSituationID");

                    b.HasIndex("PersonID")
                        .IsUnique();

                    b.ToTable("LifeSituations");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.LifeSituationClassification", b =>
                {
                    b.Property<int>("LifeSituationClassificationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Age")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("ChronicIllnesses")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Dependece")
                        .HasColumnType("INTEGER");

                    b.Property<int>("FamilySituation")
                        .HasColumnType("INTEGER");

                    b.Property<int>("FinancialSituation")
                        .HasColumnType("INTEGER");

                    b.Property<int>("HealthSituation")
                        .HasColumnType("INTEGER");

                    b.Property<int>("HouseholdSize")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PersonID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("StandardOfLiving")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TownPopulation")
                        .HasColumnType("INTEGER");

                    b.HasKey("LifeSituationClassificationID");

                    b.HasIndex("PersonID")
                        .IsUnique();

                    b.ToTable("Classifications");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.Match", b =>
                {
                    b.Property<int>("MatchID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("DonorPersonID")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("PersonInNeedPersonID")
                        .HasColumnType("INTEGER");

                    b.HasKey("MatchID");

                    b.HasIndex("DonorPersonID");

                    b.HasIndex("PersonInNeedPersonID");

                    b.ToTable("Matches");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.Person", b =>
                {
                    b.Property<int>("PersonID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("Matched")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Role")
                        .HasColumnType("INTEGER");

                    b.HasKey("PersonID");

                    b.ToTable("People");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.PersonalDetails", b =>
                {
                    b.Property<int>("PersonalDetailsID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .HasColumnType("TEXT");

                    b.Property<int>("PersonID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Postcode")
                        .HasColumnType("TEXT");

                    b.Property<string>("Town")
                        .HasColumnType("TEXT");

                    b.HasKey("PersonalDetailsID");

                    b.HasIndex("PersonID")
                        .IsUnique();

                    b.ToTable("PersonalDetails");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.Product", b =>
                {
                    b.Property<int>("ProductID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("PersonID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ProductName")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProductType")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("ProductID");

                    b.HasIndex("PersonID");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.ContactDetails", b =>
                {
                    b.HasOne("PlatformaWsparciaAPI.Data.Entity.Person", "Person")
                        .WithOne("ContactDetails")
                        .HasForeignKey("PlatformaWsparciaAPI.Data.Entity.ContactDetails", "PersonID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Person");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.LifeSituation", b =>
                {
                    b.HasOne("PlatformaWsparciaAPI.Data.Entity.Person", "Person")
                        .WithOne("LifeSituation")
                        .HasForeignKey("PlatformaWsparciaAPI.Data.Entity.LifeSituation", "PersonID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Person");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.LifeSituationClassification", b =>
                {
                    b.HasOne("PlatformaWsparciaAPI.Data.Entity.Person", "Person")
                        .WithOne("LifeSituationClassification")
                        .HasForeignKey("PlatformaWsparciaAPI.Data.Entity.LifeSituationClassification", "PersonID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Person");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.Match", b =>
                {
                    b.HasOne("PlatformaWsparciaAPI.Data.Entity.Person", "Donor")
                        .WithMany()
                        .HasForeignKey("DonorPersonID");

                    b.HasOne("PlatformaWsparciaAPI.Data.Entity.Person", "PersonInNeed")
                        .WithMany()
                        .HasForeignKey("PersonInNeedPersonID");

                    b.Navigation("Donor");

                    b.Navigation("PersonInNeed");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.PersonalDetails", b =>
                {
                    b.HasOne("PlatformaWsparciaAPI.Data.Entity.Person", "Person")
                        .WithOne("PersonalDetails")
                        .HasForeignKey("PlatformaWsparciaAPI.Data.Entity.PersonalDetails", "PersonID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Person");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.Product", b =>
                {
                    b.HasOne("PlatformaWsparciaAPI.Data.Entity.Person", "Person")
                        .WithMany("Products")
                        .HasForeignKey("PersonID");

                    b.Navigation("Person");
                });

            modelBuilder.Entity("PlatformaWsparciaAPI.Data.Entity.Person", b =>
                {
                    b.Navigation("ContactDetails")
                        .IsRequired();

                    b.Navigation("LifeSituation");

                    b.Navigation("LifeSituationClassification");

                    b.Navigation("PersonalDetails")
                        .IsRequired();

                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}