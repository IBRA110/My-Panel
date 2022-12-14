using Core.Interfaces;

namespace Infrastructure.Services
{
    public class DateService : IDateService
    {
        public DateTime GetDateFromRefreshToken()
        {
            return new DateTime();
        }
    }
}