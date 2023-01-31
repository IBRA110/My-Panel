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

            string id = resultContext.HttpContext.User.FindFirst("UserName")?.Value;
            
            IUserBehaviour repo = resultContext.HttpContext.RequestServices.GetService<IUserBehaviour>();

            AppUserEntity user = await repo.GetUserByUsernameAsync(id);

            user.LastActive = DateTime.Now;
            await repo.SaveAllAsync();

        }
    }
}