using LegendLore.Repositories;

namespace LegendLore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddTransient<IUserProfileRepository, UserProfileRepository>();
            builder.Services.AddTransient<ICampaignsRepository, CampaignsRepository>();
            builder.Services.AddTransient<IMapRepository, MapRepository>();
            builder.Services.AddTransient<IMapPOIsRepository, MapPOIsRepository>();
            builder.Services.AddTransient<IPOIRepository, POIRepository>();
            builder.Services.AddTransient<INotableLocationRepository, NotableLocationRepository>();
            builder.Services.AddTransient<IQuestRepository, QuestRepository>();
            builder.Services.AddTransient<INPCRepository, NPCRepository>();
            builder.Services.AddTransient<IRandomEncountersTableRepository, RandomEncountersTableRepository>();
            builder.Services.AddTransient<IPOINotableLocationsRepository, POINotableLocationsRepository>();
            builder.Services.AddTransient<IPOINPCsRepository, POINPCsRepository>();
            builder.Services.AddTransient<IPOIQuestsRepository, POIQuestsRepository>();
            builder.Services.AddTransient<IPOIRandEncounterTablesRepository, POIRandEncounterTablesRepository>();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();

                app.UseCors(options =>
                {
                    options.AllowAnyOrigin();
                    options.AllowAnyMethod();
                    options.AllowAnyHeader();
                });
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}