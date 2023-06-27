using Core.DTOs.CalendarEventDTOs;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Interfaces
{
    public interface ICalendarEventRepository
    {
        void CreateEvent(CalendarEventEntity ev);
        void UpdateEvent(CalendarEventEntity ev);
        void DeleteEvent(CalendarEventEntity ev);
        Task<CalendarEventEntity> GetEventById(Ulid id);
        Task<List<CalendarEventDTO>> GetEvents(DateTime startDate, DateTime endDate, string userName);
    }
}
