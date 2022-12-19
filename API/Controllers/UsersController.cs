using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Core.Interfaces;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<AppUserEntity>>> GetUsers()
        {    
            return Ok(await _userRepository.GetUsersAsync());
        }
        
        [HttpGet("{username}")] 
        public async Task<ActionResult<AppUserEntity>> GetUserByUserName(string username)
        {
            return await _userRepository.GetUserByUsernameAsync(username);
        }
    }
}
