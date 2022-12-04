using Microsoft.AspNetCore.Mvc;

using API.Data;
using API.Entities;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        // api/users/
        [HttpGet()]
        public ActionResult<IEnumerable<AppUser>> GetUsers()
        {            
            return _context.Users.ToList();;
        }
        
        // api/users/3
        [HttpGet("{id}")]
        public ActionResult<AppUser> GetUser(int id)
        {
            return _context.Users.Find(id);
        }
    }
}