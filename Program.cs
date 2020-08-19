using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace blazor_webpack_sass_typescript
{
    public class Program
    {
        public static void Main(string[] args)
        {
#if DEBUG
            // To force 'webpack-dev-server' to reload the browser.
            // This file must exist when 'webpack-dev-server' is started.
            // If it doesn't exists on dev server startup, it's ignored.
            File.SetLastWriteTimeUtc("wwwroot/webpack.reload", DateTime.UtcNow);
#endif
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
