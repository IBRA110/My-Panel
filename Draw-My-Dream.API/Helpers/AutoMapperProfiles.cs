using API.DTOs;
using Core.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUserEntity, MemberDTO>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                    src.Images.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src =>
                    src.DateOfBirth.CalculateAge()));
            CreateMap<ImageEntity, ImageDTO>();
            CreateMap<MemberUpdateDTO, AppUserEntity>();
            CreateMap<RegisterDTO, AppUserEntity>();
            CreateMap<MessageEntity, MessageDTO>()
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src => 
                    src.Sender.Images.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src => 
                    src.Recipient.Images.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}
