using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using API.DTOs;
using AutoMapper;
using System.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly DataContext _context;
        public UsersController(IUserRepository userRepository, IMapper mapper, ITokenService tokenService, DataContext context)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _tokenService = tokenService;
            _context = context;
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
        public async Task<ActionResult> UpdateUser([FromHeader] string authorization, MemberUpdateDTO memberUpdateDTO)
        {
            AuthenticationHeaderValue.TryParse(authorization, out AuthenticationHeaderValue headerValue);

            string accessToken = headerValue.Parameter;

            JwtSecurityToken jwtSecurityToken = _tokenService.GetDecodedAccessToken(accessToken);

            Ulid id = Ulid.Parse(jwtSecurityToken.Claims.First(c => c.Type == "Id").Value);
            
            AppUserEntity user = await _context.Users
                .SingleOrDefaultAsync(x => x.Id == id);

            _mapper.Map(memberUpdateDTO, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }
    }
}
