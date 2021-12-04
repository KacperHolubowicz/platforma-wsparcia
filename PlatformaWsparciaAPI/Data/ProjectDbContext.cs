using Microsoft.EntityFrameworkCore;
using PlatformaWsparciaAPI.Data.Entity;
using System;

namespace PlatformaWsparciaAPI.Data
{
    public class ProjectDbContext : DbContext
    {
        public ProjectDbContext(DbContextOptions<ProjectDbContext> contextOptions)
            : base(contextOptions) { }

        public DbSet<Person> People { get; set; }
        public DbSet<ContactDetails> ContactDetails { get; set; }
        public DbSet<PersonalDetails> PersonalDetails { get; set; }
        public DbSet<LifeSituation> LifeSituations { get; set; }
        public DbSet<LifeSituationClassification> Classifications { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<AdminAccount> AdminAccount { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>()
                .HasKey(p => p.PersonID);
            modelBuilder.Entity<Product>()
                .HasKey(pr => pr.ProductID);
            modelBuilder.Entity<Match>()
                .HasKey(m => m.MatchID);
            modelBuilder.Entity<ContactDetails>()
                .HasKey(cd => cd.ContactDetailsID);
            modelBuilder.Entity<LifeSituation>()
                .HasKey(ls => ls.LifeSituationID);
            modelBuilder.Entity<LifeSituationClassification>()
                .HasKey(lsc => lsc.LifeSituationClassificationID);
            modelBuilder.Entity<PersonalDetails>()
                .HasKey(pd => pd.PersonalDetailsID);

            modelBuilder.Entity<Person>()
                .HasOne(p => p.ContactDetails)
                .WithOne(c => c.Person)
                .HasForeignKey<ContactDetails>(cd => cd.PersonID);
            modelBuilder.Entity<Person>()
                .HasOne(p => p.PersonalDetails)
                .WithOne(pd => pd.Person)
                .HasForeignKey<PersonalDetails>(pd => pd.PersonID);
            modelBuilder.Entity<Person>()
                .HasOne(p => p.LifeSituation)
                .WithOne(ls => ls.Person)
                .HasForeignKey<LifeSituation>(ls => ls.PersonID);
            modelBuilder.Entity<Person>()
                .HasOne(p => p.LifeSituationClassification)
                .WithOne(lsc => lsc.Person)
                .HasForeignKey<LifeSituationClassification>(lsc => lsc.PersonID);
            modelBuilder.Entity<Person>()
                .HasMany(p => p.Products)
                .WithOne(p => p.Person);

            modelBuilder.Entity<Match>()
                .HasOne(m => m.Donor);
            modelBuilder.Entity<Match>()
                .HasOne(m => m.PersonInNeed);

            modelBuilder.Entity<AdminAccount>()
                .HasKey(a => a.ID);
        }
    }
}
