using System.Reflection;
using API.Extensions;
using Infrastracture.Middleware;
using Microsoft.OpenApi.Models;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title ="Draw-My-Dream", Version = "v1", });
    string xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    string xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddCors();

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

app.UseAuthorization();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));

app.MapControllers();

app.Run("http://localhost:5000");
