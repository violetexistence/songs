using Microsoft.EntityFrameworkCore;

namespace Dal.Models;

public partial class SongsContext : DbContext {
    public SongsContext() {
    }

    public SongsContext(DbContextOptions<SongsContext> options) : base(options) {
    }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Person> People { get; set; }

    public virtual DbSet<PersonLocation> PersonLocations { get; set; }

    public virtual DbSet<Relationship> Relationships { get; set; }

    public virtual DbSet<RelationshipType> RelationshipTypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        var connectionString = Environment.GetEnvironmentVariable("SONGS_CONNECTION_STRING");
        optionsBuilder.UseSqlServer(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Relationship>(entity => {
            entity.HasKey(e => e.RelationshipId).HasName("PK_Relationshp");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
