using Core.DTOs.CalendarEventDTOs;
using Core.Entities;
using Core.Interfaces;
using HotChocolate.Authorization;
using System.Security.Claims;

namespace API.GraphQL.CalendarEvents
{
    [ExtendObjectType("Queries")]
    public class CalendarEventQueries
    {
        [UseProjection]
        [Authorize]
        public async Task<List<CalendarEventDTO>> GetCalendarEvent(
            [Service] IUnitOfWork unitOfWork, 
            ClaimsPrincipal claimsPrincipal, 
            DateTime startDate, 
            DateTime endDate)
        {
            AppUserEntity user = await unitOfWork.userRepository.GetUserByIdAsync(Ulid.Parse(claimsPrincipal.FindFirst("Id").Value));

            return await unitOfWork.CalendarEvent.GetEvents(startDate, endDate, user.UserName);
        }
    }
}
