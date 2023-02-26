using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Net;

namespace Infrastructure.Middleware
{
    public static class StringExtensions
    {

        public static T TryDeserializeObject<T>(this string value)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    return default(T);
                }

                return JsonConvert.DeserializeObject<T>(value);
            }
            catch
            {
                return default(T);
            }
        }
    }

    public class ErrorDto
    {
        public ExtensionsError Extensions { get; set; }
    }

    public class ErrorsDto
    {
        public List<ErrorDto> Errors { get; set; }
    }

    public class ExtensionsError
    {
        public string Code { get; set; }
        public string StackTrace { get; set; }
    }

    public class ResponseMiddleware
    {
        private readonly RequestDelegate next;

        public ResponseMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {

            Stream originalBody = context.Response.Body;

            try
            {
                using (var memStream = new MemoryStream())
                {
                    context.Response.Body = memStream;

                    await next(context);

                    memStream.Position = 0;
                    string responseBody = new StreamReader(memStream).ReadToEnd();

                    if (!string.IsNullOrWhiteSpace(responseBody))
                    {
                        ErrorsDto errors = responseBody.TryDeserializeObject<ErrorsDto>();

                        if (errors?.Errors != null && errors.Errors.Count > 0)
                        {
                            if (errors.Errors.FirstOrDefault(x => !string.IsNullOrWhiteSpace(x?.Extensions?.StackTrace)) != null)
                            {
                                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                            }
                            else if (errors.Errors.FirstOrDefault(x => x?.Extensions?.Code == "AUTH_NOT_AUTHORIZED") != null)
                            {
                                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                            }
                            else
                            {
                                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                            }
                        }
                    }

                    memStream.Position = 0;
                    await memStream.CopyToAsync(originalBody);
                }

            }
            finally
            {
                context.Response.Body = originalBody;
            }

        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class ResponseMiddlewareExtensions
    {
        public static IApplicationBuilder UseResponseMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ResponseMiddleware>();
        }
    }
}
