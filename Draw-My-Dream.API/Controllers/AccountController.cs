using API.DTOs;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUserEntity> _userManager;
        private readonly SignInManager<AppUserEntity> _signInManager;
        public AccountController(
            UserManager<AppUserEntity> userManager,
            SignInManager<AppUserEntity> signInManager,
            ITokenService tokenService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
        {
            _unitOfWork = unitOfWork; 
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<SuccessDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Username))
            {
                throw new Exception("Username is already taken");
            }
            if (await EmailExists(registerDTO.Email))
            {
                throw new Exception("Email is already taken");
            }
            
            AppUserEntity user = _mapper.Map<AppUserEntity>(registerDTO);

            
            user.UserName = registerDTO.Username;

            IdentityResult result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            IdentityResult roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded)
            {
                return BadRequest(result.Errors);
            }
             
            return new SuccessDTO
            {
                Message = "Registration Successful"
            };
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDTO>> Login(LoginDTO loginDTO)
        {

            AppUserEntity user = await _userManager.Users
                    .Include(u => u.Images)
                    .SingleOrDefaultAsync(x => x.UserName.ToLower() == loginDTO.UserName.ToLower());

            if (user == null)
            {
                return Unauthorized("User does not exist!");
            }

            SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized("password is wrong!");
            }

            string refreshToken = _tokenService.CreateRefreshToken(user);
            
            user.RefreshToken = refreshToken;
            await _unitOfWork.Complete();

            return new LoginResponseDTO
            {
                AccessToken = await _tokenService.CreateAccessToken(user),
                RefreshToken = refreshToken
            };
        }

        [HttpPost("refresh")]
        [Authorize]
        public async Task<ActionResult<LoginResponseDTO>> Refresh(RefreshTokenDTO refreshToken)
        {
            AppUserEntity user = await _unitOfWork.userBehaviour.GetUserByIdAsync(User.FindFirst("Id").Value);

            if (user == null || refreshToken.RefreshToken != user.RefreshToken)
            {
                throw new ArgumentException("Something went wrong!");
            }
            

            user.RefreshToken = _tokenService.CreateRefreshToken(user);

            await _unitOfWork.Complete();
            
            return new LoginResponseDTO
            {
                AccessToken = await _tokenService.CreateAccessToken(user),
                RefreshToken = user.RefreshToken
            };
        }
        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }

        private async Task<bool> EmailExists(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email);
        }
    }
}
