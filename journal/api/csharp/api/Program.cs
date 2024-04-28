using Dal.Models;
using Microsoft.OpenApi.Models;

namespace WebApi {
    public class Program {
        public static void Main(string[] args) {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo {
                    Title = "Songs Web API",
                    Description = "Making tools for story telling gamers.",
                    Version = "v1"
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment()) {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseDeveloperExceptionPage();
                builder.Services.AddDbContext<SongsContext>(); //TODO: Add InMemory database
            }
            else {
                app.UseExceptionHandler("/error");
                builder.Services.AddDbContext<SongsContext>();
            }
            app.MapGet("/", () => "Welcome to Songs");
            app.MapGet("/error", () => Results.Problem("An error occurred.")); //Minimal API for error handling

            //app.MapGet("/error/test", () => { throw new Exception("test"); });

            app.Run();
        }
    }
}
