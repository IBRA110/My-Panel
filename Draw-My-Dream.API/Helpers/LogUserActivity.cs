using API.Interfaces;
using Core.Entities;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            ActionExecutedContext resultContext = await next();

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated)
            {
                return;
            }

            Ulid id = Ulid.Parse(resultContext.HttpContext.User.FindFirst("UserName")?.Value);
            IUserInterface repo = resultContext.HttpContext.RequestServices.GetService<IUserInterface>();

            AppUserEntity user = await repo.GetUserByIdAsync(id);

            user.LastActive = DateTime.Now;
            await repo.SaveAllAsync();

        }
    }
}