using Microsoft.EntityFrameworkCore;


namespace Dal.Models;

public partial class SongsContext : DbContext {

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        var connectionString = Environment.GetEnvironmentVariable("SONGS_CONNECTION_STRING");
        optionsBuilder.UseSqlServer(connectionString);
    }
}

