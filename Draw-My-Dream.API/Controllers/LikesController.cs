using API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> AddLike(AddLikeDTO addLikeDTO)
        {
            
            return Ok();
        }
    }
}