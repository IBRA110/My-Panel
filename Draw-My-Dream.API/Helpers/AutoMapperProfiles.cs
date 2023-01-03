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
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src =>
                    src.DateOfBirth.CalculateAge()));
            CreateMap<PhotoEntity, PhotoDTO>();
            CreateMap<DrawingEntity, DrawingDTO>();
            CreateMap<MemberUpdateDTO, AppUserEntity>();
            CreateMap<RegisterDTO, AppUserEntity>();
        }
    }
}
