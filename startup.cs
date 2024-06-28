using Microsoft.EntityFrameworkCore;
using ShopEasy.Data;

public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<ShopEasyDbContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

    services.AddControllers();
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseRouting();
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}


//payment

using Microsoft.Extensions.Configuration;
using Stripe;

public void ConfigureServices(IServiceCollection services)
{
    services.AddStripe(options =>
    {
        options.SecretKey = Configuration["Stripe:SecretKey"];
        options.PublishableKey = Configuration["Stripe:PublishableKey"];
    });
}