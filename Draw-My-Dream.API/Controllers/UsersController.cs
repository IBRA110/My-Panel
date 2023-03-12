using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Core.Interfaces;
using Core.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Helpers;
using API.Extensions;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public UsersController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers([FromQuery]UserParams userParams)
        {   

            AppUserEntity user = await _unitOfWork.userRepository.GetUserByUsernameAsync(User.FindFirst("UserName")?.Value);

            userParams.CurrentUsername = user.UserName;
            
            PagedList<MemberDTO> users = await _unitOfWork.userRepository.GetMembersAsync(userParams);
            
            Response.AddPaginationHeader(users.CurrentPage, 
                users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }
        
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDTO>> GetUserByUserName(string username)
        {
            return await _unitOfWork.userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
        {
   
            AppUserEntity user = await _unitOfWork.userRepository.GetUserByIdAsync(User.FindFirst("Id").Value);

            _mapper.Map(memberUpdateDTO, user);

            _unitOfWork.userRepository.Update(user);

            if (await _unitOfWork.Complete())
            {
                return NoContent();
            } 

            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult> AddPhoto([FromForm]IFormFile file)
        {
   
            AppUserEntity user = await _unitOfWork.userRepository.GetUserByIdAsync(User.FindFirst("Id").Value);

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;

            ImageEntity photo = new ImageEntity
            {
                Url = "images/" + uniqueFileName
            };

            if (user.Images.Count == 0)
            {
                photo.IsMain = true;
            }

            user.Images.Add(photo);

            if (await _unitOfWork.Complete())
            {
                string imagePath = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/", uniqueFileName);
                file.CopyTo(new FileStream(imagePath, FileMode.Create));

                return Ok("Upload Success!");
            }
                
            return BadRequest("Error!");
        }
        
        [HttpPut("set-main-photo/{imageId}")]
        public async Task<ActionResult> SetMainPhoto(string imageId)
        {
               
            AppUserEntity user = await _unitOfWork.userRepository.GetUserByIdAsync(User.FindFirst("Id").Value);

            ImageEntity image = user.Images.FirstOrDefault(x => x.Id == imageId);

            if (image.IsMain)
            {
                return BadRequest("This is already your main photo");
            }

            ImageEntity currentMain = user.Images.FirstOrDefault(x => x.IsMain);
            
            if (currentMain != null)
            { 
                currentMain.IsMain = false;
            }
            image.IsMain = true;

            if (await _unitOfWork.Complete())
            { 
                return NoContent();
            }
            return BadRequest("Failed to set main photo");
        }
        
        [HttpDelete("delete-photo/{imageId}")]
        public async Task<ActionResult> DeletePhoto(string imageId)
        {
   
            AppUserEntity user = await _unitOfWork.userRepository.GetUserByIdAsync(User.FindFirst("Id").Value);

            ImageEntity image = user.Images.FirstOrDefault(x => x.Id == imageId);

            if (image == null)
            {
                return NotFound();
            }

            if (image.IsMain)
            {
                return BadRequest("You cannot delete your main photo");
            }
            
            System.IO.File.Delete(Directory.GetCurrentDirectory() + "/wwwroot/images/" + image.Url);  
            
            user.Images.Remove(image);

            if (await _unitOfWork.Complete())
            {
                return Ok();
            }

            return BadRequest("Failed to delete the photo");
        }

    }
}
