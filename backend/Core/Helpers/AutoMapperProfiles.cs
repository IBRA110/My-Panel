using Core.Entities;
using AutoMapper;
using Core.DTOs.ImageDTOs;
using Core.DTOs.MessageDTOs;
using Core.DTOs.AccountDTOs;
using Core.DTOs.UserDTOs;
using Core.DTOs.CalendarEventDTOs;

namespace Core.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUserEntity, MemberDTO>()
                .ForMember(desk => desk.PhotoUrl, opt => opt.MapFrom(src => 
                    src.Images.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(desk => desk.Age, opt => opt.MapFrom(src =>
                    src.DateOfBirth.CalculateAge()));
            CreateMap<ImageEntity, ImageDTO>();
            CreateMap<CalendarEventEntity, CalendarEventDTO>()
                .ForMember(desk => desk.CreatorUserName, opt => opt.MapFrom(src =>
                    src.Creator.UserName));
            CreateMap<MemberUpdateDTO, AppUserEntity>();
            CreateMap<RegisterDTO, AppUserEntity>();
            CreateMap<MessageEntity, MessageDTO>()
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src => 
                    src.Sender.Images.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src => 
                    src.Recipient.Images.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}
