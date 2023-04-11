using System.Reflection;
using API.Extensions;
using API.SignalR;
using Core.Entities;
using Infrastructure.Data;
using Infrastructure.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddGraphQLServices(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title ="My-Panel", Version = "v1", });
    string xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    string xmlPath = System.IO.Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AddIdentityServices(builder.Configuration);


builder.Services.AddCors(options =>
 {
     options.AddPolicy("AllowAll", builder => builder
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());
 });

builder.Services.AddSignalR();


WebApplication app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseSwagger();

app.UseSwaggerUI(opt =>
{
    opt.SwaggerEndpoint("/swagger/v1/swagger.json", "TestService");
    opt.DefaultModelsExpandDepth(-1);
});

app.UseAuthentication();

app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
app.MapHub<PresenceHub>("hubs/presence");
app.MapHub<MessageHub>("hubs/message");
app.MapGraphQL("/graphql");


IServiceScope scope = app.Services.CreateScope();
IServiceProvider services = scope.ServiceProvider;
try
{
    DataContext context = services.GetRequiredService<DataContext>();
    UserManager<AppUserEntity> userManager = services.GetRequiredService<UserManager<AppUserEntity>>();
    RoleManager<AppRoleEntity> roleManager = services.GetRequiredService<RoleManager<AppRoleEntity>>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(userManager, roleManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
