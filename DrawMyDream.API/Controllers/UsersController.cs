using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using API.DTOs;
using AutoMapper;
using API.Entities;
using System.Security.Claims;

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
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
        {    
            var users = await _userRepository.GetMembersAsync();
            
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


            string FileName = file.FileName;

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + FileName;

            string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/", FileName);

            file.CopyTo(new FileStream(imagePath, FileMode.Create));

            PhotoEntity photo = new PhotoEntity
            {
                Url = "images/" + FileName
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

    }
}
