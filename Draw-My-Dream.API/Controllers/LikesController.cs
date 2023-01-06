using API.DTOs;
using API.Interfaces;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly IUserInterface _userInterface;
        
        public LikesController(IUserInterface userInterface)
        {
            _userInterface = userInterface;
        }
        [HttpPost]
        public async Task<ActionResult> ToggleLike(ToggleLikeDTO toggleLikeDTO)
        {
            AppUserEntity likedUser = await _userInterface.GetUserByIdAsync(Ulid.Parse(User.FindFirst("Id").Value));
            
            AppUserEntity imageOwner = await _userInterface.GetUserByIdAsync(toggleLikeDTO.ImageOwnerId);
            
            ImageEntity image = imageOwner.Images.FirstOrDefault(x => x.Id == toggleLikeDTO.ImageId);
           
            ImageLikeEntity like = image.Likes.FirstOrDefault(x => x.LikedUserId == likedUser.Id);

            if (like is null)
            {
                like = new ImageLikeEntity
                {
                    LikedImageId = image.Id,
                    LikedUserId = likedUser.Id
                };
                
                image.Likes.Add(like);

                if (await _userInterface.SaveAllAsync())
                { 
                    return Ok("Liked");
                }
                return BadRequest("Something went wrong!");
            }
            
            image.Likes.Remove(like);
            
            if (await _userInterface.SaveAllAsync())
            { 
                return Ok("Liked");
            }
            
            return BadRequest("Something went wrong!");      
        }
    }
}