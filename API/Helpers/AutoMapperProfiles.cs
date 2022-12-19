using API.DTOs;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUserEntity, MemberDTO>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                    src.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<PhotoEntity, PhotoDTO>();
            CreateMap<DrawingEntity, DrawingDTO>();
        }
    }
}