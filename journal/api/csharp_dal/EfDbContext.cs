using Microsoft.EntityFrameworkCore;

namespace dal {
    internal class EfDbContext : DbContext {
        
        public EfDbContext(DbContextOptions<EfDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            //base.OnConfiguring(optionsBuilder);
            //optionsBuilder.UseSqlite("Data Source=people.db");
        }

        //public DbSet<Person> People { get; set; }
    }
}