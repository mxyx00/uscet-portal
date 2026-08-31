using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Member> Members { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Member>().HasData(
                new Member
                {
                    Id = 1,
                    FirstName = "Maya",
                    LastName = "Shvab",
                    Position = "President",
                    Year = 2027
                },
                new Member
                {
                    Id = 2,
                    FirstName = "Alex",
                    LastName = "Johnson",
                    Position = "Member",
                    Year = 2028
                },
                new Member
                {
                    Id = 3,
                    FirstName = "Jordan",
                    LastName = "Lee",
                    Position = "Member",
                    Year = 2026
                }
            );
        }
    }
}