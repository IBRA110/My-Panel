using Core.DTOs;
using Core.DTOs.CalendarEventDTOs;
using Core.Entities;
using Core.Interfaces;
using HotChocolate.Authorization;
using System.Security.Claims;

namespace API.GraphQL.CalendarEvents
{
    [ExtendObjectType("Mutations")]
    public class CalendarEventMutations
    {
        [UseProjection]
        [Authorize]
        public async Task<CalendarEventDTO> CreateEvent(
            [Service] IUnitOfWork unitOfWork,
            ClaimsPrincipal claimsPrincipal,
            string title,
            string content,
            bool isPrivate,
            string color,
            DateTime startDate,
            DateTime endDate)
        {
            AppUserEntity user = await unitOfWork.userRepository.GetUserByIdAsync(Ulid.Parse(claimsPrincipal.FindFirst("Id").Value));

            CalendarEventEntity calendarEvent = new CalendarEventEntity()
            {
                Title = title,
                Content = content,
                Creator = user,
                StartDate = startDate,
                EndDate = endDate,
                DateCreated = DateTime.Now,
                IsPrivate = isPrivate,
                Color = color,
            };
            

            unitOfWork.CalendarEvent.CreateEvent(calendarEvent);
            
            if (!await unitOfWork.Complete())
            {
                throw new GraphQLException("Failed to create event");
            }


            return new CalendarEventDTO()
            {
                Id = calendarEvent.Id.ToString(),
                Title = calendarEvent.Title,
                Content = calendarEvent.Content,
                CreatorUserName = calendarEvent.Creator.UserName,
                StartDate = calendarEvent.StartDate,
                EndDate = calendarEvent.EndDate,
                DateCreated = calendarEvent.DateCreated,
                Color = calendarEvent.Color,
            };
        }

        [UseProjection]
        [Authorize]
        public async Task<CalendarEventDTO> UpdateEvent(
            [Service] IUnitOfWork unitOfWork,
            ClaimsPrincipal claimsPrincipal,
            string id,
            string title,
            string content,
            string color,
            DateTime startDate,
            DateTime endDate,
            bool isPrivate)
        {
            AppUserEntity user = await unitOfWork.userRepository.GetUserByIdAsync(Ulid.Parse(claimsPrincipal.FindFirst("Id").Value));
                        
            CalendarEventEntity calendarEvent = await unitOfWork.CalendarEvent.GetEventById(Ulid.Parse(id));
            
            if (user.UserName != calendarEvent.Creator.UserName) 
            {
                throw new GraphQLException("Permission denied");
            }

            calendarEvent.Title = title;
            calendarEvent.Content = content;
            calendarEvent.DateUpdated = DateTime.Now;
            calendarEvent.EndDate = endDate;
            calendarEvent.StartDate = startDate;
            calendarEvent.IsPrivate = isPrivate;
            calendarEvent.Color = color;

            unitOfWork.CalendarEvent.UpdateEvent(calendarEvent);
            
            if (!await unitOfWork.Complete())
            {
                throw new GraphQLException("Failed to update event");
            }


            return new CalendarEventDTO()
            {
                Id = calendarEvent.Id.ToString(),
                Title = calendarEvent.Title,
                Content = calendarEvent.Content,
                CreatorUserName = calendarEvent.Creator.UserName,
                DateCreated = calendarEvent.DateCreated,
                DateUpdated = calendarEvent.DateUpdated,
                StartDate = calendarEvent.StartDate,
                EndDate = calendarEvent.EndDate,
                Color = calendarEvent.Color
            };
        }

        [UseProjection]
        [Authorize]
        public async Task<SuccessDTO> RemoveEvent(
            [Service] IUnitOfWork unitOfWork,
            ClaimsPrincipal claimsPrincipal,
            string id)
        {
            AppUserEntity user = await unitOfWork.userRepository.GetUserByIdAsync(Ulid.Parse(claimsPrincipal.FindFirst("Id").Value));

            CalendarEventEntity calendarEvent = await unitOfWork.CalendarEvent.GetEventById(Ulid.Parse(id));

            if (user.UserName != calendarEvent.Creator.UserName)
            {
                throw new GraphQLException("Permission denied");
            }

            unitOfWork.CalendarEvent.DeleteEvent(calendarEvent);

            if (!await unitOfWork.Complete())
            {
                throw new GraphQLException("Failed to remove event");
            }


            return new SuccessDTO()
            {
                Message = "Event removed successfully!"
            };
        }
    }
}
