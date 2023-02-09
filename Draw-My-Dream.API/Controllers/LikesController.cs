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
        private readonly IUserBehaviour _userBehaviour;
        
        public LikesController(IUserBehaviour userBehaviour)
        {
            _userBehaviour = userBehaviour;
        }
        [HttpPut]
        public async Task<ActionResult> ToggleLike(ToggleLikeDTO toggleLikeDTO)
        {
            AppUserEntity likedUser = await _userBehaviour.GetUserByIdAsync(Ulid.Parse(User.FindFirst("Id").Value));
            
            AppUserEntity imageOwner = await _userBehaviour.GetUserByIdAsync(toggleLikeDTO.ImageOwnerId);
            
            ImageEntity image = imageOwner.Images.FirstOrDefault(x => x.imageId == toggleLikeDTO.ImageId);
           
            ImageLikeEntity like = image.Likes.FirstOrDefault(x => x.LikedUserId == likedUser.userId);

            if (like is null)
            {
                like = new ImageLikeEntity
                {
                    LikedImageId = image.imageId,
                    LikedUserId = likedUser.userId
                };
                
                image.Likes.Add(like);
                
                if (await _userBehaviour.SaveAllAsync())
                { 
                    return Ok("Liked");
                }
                return BadRequest("Something went wrong!");
            }
            
            image.Likes.Remove(like);
            if (await _userBehaviour.SaveAllAsync())
            { 
                return Ok("Unliked");
            }
            
            return BadRequest("Something went wrong!");      
        }
    }
}