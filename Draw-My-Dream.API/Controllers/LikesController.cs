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
        public async Task<ActionResult> AddLike(AddLikeDTO addLikeDTO)
        {
            
            AppUserEntity imageOwner = await _userInterface.GetUserByIdAsync(addLikeDTO.ImageOwnerId);
            
            return Ok();
        }
    }
}