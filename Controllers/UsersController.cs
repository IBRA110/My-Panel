using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using API.DTOs;
using AutoMapper;
using API.Entities;
using System.Security.Claims;
using API.Helpers;
using API.Extensions;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers([FromQuery]UserParams userParams)
        {    
            PagedList<MemberDTO> users = await _userRepository.GetMembersAsync(userParams);
            Response.AddPaginationHeader(users.CurrentPage, 
                users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }
        
        [HttpGet("{username}")] 
        public async Task<ActionResult<MemberDTO>> GetUserByUserName(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
        {            
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            
            Ulid id = Ulid.Parse(identity.FindFirst("Id").Value);
   
            AppUserEntity user = await _userRepository.GetUserByIdAsync(id);

            _mapper.Map(memberUpdateDTO, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync())
            {
                return NoContent();
            } 

            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult> AddPhoto([FromForm]IFormFile file)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            
            Ulid id = Ulid.Parse(identity.FindFirst("Id").Value);
   
            AppUserEntity user = await _userRepository.GetUserByIdAsync(id);

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;

            string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/", uniqueFileName);

            file.CopyTo(new FileStream(imagePath, FileMode.Create));

            PhotoEntity photo = new PhotoEntity
            {
                Url = "images/" + uniqueFileName
            };

            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            if (await _userRepository.SaveAllAsync())
            {
                return Ok("Upload Success!");
            }
                
            return BadRequest("Error!");
        }
        
        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(Ulid photoId)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            
            Ulid id = Ulid.Parse(identity.FindFirst("Id").Value);
   
            AppUserEntity user = await _userRepository.GetUserByIdAsync(id);

            PhotoEntity photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain)
            {
                return BadRequest("This is already your main photo");
            }

            PhotoEntity currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
            
            if (currentMain != null)
            { 
                currentMain.IsMain = false;
            }
            photo.IsMain = true;

            if (await _userRepository.SaveAllAsync())
            { 
                return NoContent();
            }
            return BadRequest("Failed to set main photo");
        }
        
        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(Ulid photoId)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            
            Ulid id = Ulid.Parse(identity.FindFirst("Id").Value);
   
            AppUserEntity user = await _userRepository.GetUserByIdAsync(id);

            PhotoEntity photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null)
            {
                return NotFound();
            }

            if (photo.IsMain)
            {
                return BadRequest("You cannot delete your main photo");
            }
            
            System.IO.File.Delete(Directory.GetCurrentDirectory() + "/wwwroot/" + photo.Url);  
            
            user.Photos.Remove(photo);

            if (await _userRepository.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest("Failed to delete the photo");
        }

    }
}
