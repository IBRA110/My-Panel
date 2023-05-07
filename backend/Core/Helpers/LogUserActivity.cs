using Core.Interfaces;
using Core.Entities;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Helpers
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
            
            IUnitOfWork unitOfwWork = resultContext.HttpContext.RequestServices.GetService<IUnitOfWork>();

            AppUserEntity user = await unitOfwWork.userRepository.GetUserByUsernameAsync(id);

            user.LastActive = System.DateTime.UtcNow;

            await unitOfwWork.Complete();

        }
    }
}