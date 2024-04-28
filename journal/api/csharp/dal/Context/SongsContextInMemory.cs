using Dal.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Dal.Context {
    internal class SongsContextInMemory {
        public static SongsContext GetInMemoryContext() {
            var context = new SongsContext();
            context.Database.EnsureCreated();
            return context;
        }

        public static DbContextOptions<T> CreateDbContextOptions<T>() where T : DbContext {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() {
                Mode = SqliteOpenMode.Memory,
                Cache = SqliteCacheMode.Shared,
                Password = "password"
            }.ToString();
            var connection = new SqliteConnection(connectionStringBuilder.ToString());
            connection.Open();

            var builder = new DbContextOptionsBuilder<T>()
                .UseSqlite(connection)
                .Options;
            return builder;
        }
    }
}
