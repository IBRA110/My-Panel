using Core.DTOs.CalendarEventDTOs;
using Core.Entities;
using Core.Interfaces;
using HotChocolate.Authorization;

namespace API.GraphQL.CalendarEvents
{
    [ExtendObjectType("Queries")]
    public class CalendarEventQueries
    {
        [UseProjection]
        [Authorize]
        public async Task<List<CalendarEventDTO>> GetCalendarEvent([Service] IUnitOfWork unitOfWork, DateTime startDate, DateTime endDate)
        {
            return await unitOfWork.CalendarEvent.GetEvents(startDate, endDate);
        }
    }
}
