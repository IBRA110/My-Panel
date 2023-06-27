using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.DTOs.CalendarEventDTOs;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories
{
    public class CalendarEventRepository : ICalendarEventRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CalendarEventRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public void CreateEvent(CalendarEventEntity ev)
        {
            _context.Add(ev);
        }

        public void DeleteEvent(CalendarEventEntity ev)
        {
            _context.CalendarEvents.Remove(ev);
        }

        public async Task<List<CalendarEventDTO>> GetEvents(DateTime startDate, DateTime endDate)
        {
            return await _context.CalendarEvents
                .Where(c => startDate >= c.StartDate && endDate <= c.EndDate)
                .ProjectTo<CalendarEventDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
        public async Task<CalendarEventEntity> GetEventById(Ulid id)
        {
            return await _context.CalendarEvents
                .Where(c => c.Id == id)
                .Include(c  => c.Creator)
                .SingleOrDefaultAsync();
        }
        public void UpdateEvent(CalendarEventEntity ev)
        {
            _context.CalendarEvents.Entry(ev).State = EntityState.Modified;
        }
    }
}
