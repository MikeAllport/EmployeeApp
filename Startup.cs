using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace InterviewTest
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            PrepareDB();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        private void PrepareDB()
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var delTableCmd = connection.CreateCommand();
                delTableCmd.CommandText = "DROP TABLE IF EXISTS Employees";
                delTableCmd.ExecuteNonQuery();

                var createTableCmd = connection.CreateCommand();
                createTableCmd.CommandText = "CREATE TABLE Employees(Name VARCHAR(50), Value INT)";
                createTableCmd.ExecuteNonQuery();

                //Fill with data
                using (var transaction = connection.BeginTransaction())
                {
                    var insertCmd = connection.CreateCommand();
                    insertCmd.CommandText = @"INSERT INTO Employees VALUES
                        ('Abul', 1357),
                        ('Adolfo', 1224),
                        ('Alexander', 2296),
                        ('Amber', 1145),
                        ('Amy', 4359),
                        ('Andy', 1966),
                        ('Anna', 4040),
                        ('Antony', 449),
                        ('Ashley', 8151),
                        ('Borja', 9428),
                        ('Cecilia', 2136),
                        ('Christopher', 9035),
                        ('Dan', 1475),
                        ('Dario', 284),
                        ('David', 948),
                        ('Elike', 1860),
                        ('Ella', 4549),
                        ('Ellie', 5736),
                        ('Elliot', 1020),
                        ('Emily', 7658),
                        ('Faye', 7399),
                        ('Fern', 1422),
                        ('Francisco', 5028),
                        ('Frank', 3281),
                        ('Gary', 9190),
                        ('Germaine', 6437),
                        ('Greg', 5929),
                        ('Harvey', 8471),
                        ('Helen', 963),
                        ('Huzairi', 9491),
                        ('Izmi', 8324),
                        ('James', 6994),
                        ('Jarek', 6581),
                        ('Jim', 202),
                        ('John', 261),
                        ('Jose', 1605),
                        ('Josef', 3714),
                        ('Karthik', 4828),
                        ('Katrin', 5393),
                        ('Lee', 269),
                        ('Luke', 5926),
                        ('Madiha', 2329),
                        ('Marc', 3651),
                        ('Marina', 6903),
                        ('Mark', 3368),
                        ('Marzena', 7515),
                        ('Mohamed', 1080),
                        ('Nichole', 1221),
                        ('Nikita', 8520),
                        ('Oliver', 2868),
                        ('Patryk', 1418),
                        ('Paul', 4332),
                        ('Ralph', 1581),
                        ('Raymond', 7393),
                        ('Roman', 4056),
                        ('Ryan', 252),
                        ('Sara', 2618),
                        ('Sean', 691),
                        ('Seb', 5395),
                        ('Sergey', 8282),
                        ('Shaheen', 3721),
                        ('Sharni', 7737),
                        ('Sinu', 3349),
                        ('Stephen', 8105),
                        ('Tim', 8386),
                        ('Tina', 5133),
                        ('Tom', 7553),
                        ('Tony', 4432),
                        ('Tracy', 1771),
                        ('Tristan', 2030),
                        ('Victor', 1046),
                        ('Yury', 1854)";
                    insertCmd.ExecuteNonQuery();
                    transaction.Commit();
                }
            }
        }
    }
}
