using System.Security.Claims;
using Core.DTOs;
using Core.Interfaces;
using AutoMapper;
using Core.Entities;
using HotChocolate.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace API.GraphQL
{
    public class AccountMutations
    {
        public async Task<SuccessDTO> Registration(
            [Service]IUnitOfWork unitOfWork, 
            [Service]IMapper mapper,
            [Service]UserManager<AppUserEntity> userManager,
            string userName,
            string email,
            string password)
        {
            
            if (await unitOfWork.UserExists(userName))
            {
                 throw new GraphQLException("Username is already taken");
            }
            if (await unitOfWork.EmailExists(email))
            {
                throw new GraphQLException("Email is already taken");
            }
            
            RegisterDTO register = new RegisterDTO
            {
                UserName = userName,
                Email = email,
                Password = password
            };

            AppUserEntity user = mapper.Map<AppUserEntity>(register);
            
            user.UserName = register.UserName;

            IdentityResult result = await userManager.CreateAsync(user, register.Password);

            if (!result.Succeeded)
            {
                string message =  string.Join(", ", result.Errors.Select(x => "Code " + x.Code + " Description" + x.Description));
                throw new GraphQLException(message);
            }

            IdentityResult roleResult = await userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded)
            {
                string message =  string.Join(", ", result.Errors.Select(x => "Code " + x.Code + " Description" + x.Description));
                throw new GraphQLException(message);
            }
             
            return new SuccessDTO
            {
                Message = "Registration Successful"
            };
        }
        
        public async Task<LoginResponseDTO> Login(
            [Service]IUnitOfWork unitOfWork,
            [Service]UserManager<AppUserEntity> userManager,
            [Service]SignInManager<AppUserEntity> signInManager,
            [Service]ITokenService tokenService,
            string userName,
            string password)
        {
            AppUserEntity user = await userManager.Users
                    .Include(u => u.Images)
                    .SingleOrDefaultAsync(x => x.UserName.ToLower() == userName.ToLower());

            if (user == null)
            {
                throw new GraphQLException("User does not exist!");
            }

            SignInResult result = await signInManager.CheckPasswordSignInAsync(user, password, false);

            if (!result.Succeeded)
            {
                throw new GraphQLException("password is wrong!");
            }

            string refreshToken = tokenService.CreateRefreshToken(user);
            
            user.RefreshToken = refreshToken;
            await unitOfWork.Complete();

            return new LoginResponseDTO
            {
                AccessToken = await tokenService.CreateAccessToken(user),
                RefreshToken = refreshToken
            };
        }

        [Authorize]
        public async Task<LoginResponseDTO> Refresh(
            [Service]IUnitOfWork unitOfWork,
            [Service]ITokenService tokenService,
            ClaimsPrincipal claimsPrincipal,
            string refreshToken)
        {
            
            AppUserEntity user = await unitOfWork.userRepository.GetUserByIdAsync(claimsPrincipal.FindFirst("Id").Value);

            if (user == null || refreshToken != user.RefreshToken)
            {
                throw new GraphQLException("Something went wrong!");
            }

            user.RefreshToken = tokenService.CreateRefreshToken(user);

            await unitOfWork.Complete();
            
            return new LoginResponseDTO
            {
                AccessToken = await tokenService.CreateAccessToken(user),
                RefreshToken = user.RefreshToken
            };
        }
        
        [Authorize]
        public async Task<SuccessDTO> Logout([Service]IUnitOfWork unitOfWork, ClaimsPrincipal claimsPrincipal,
            string refreshToken)
        {
            
            AppUserEntity user = await unitOfWork.userRepository.GetUserByIdAsync(claimsPrincipal.FindFirst("Id").Value);

            if (user == null || refreshToken != user.RefreshToken)
            {
                throw new GraphQLException("Something went wrong!");
            }

            user.RefreshToken = null;

            await unitOfWork.Complete();
            
            return new SuccessDTO
            {
                Message = "Logout Successful"
            };
        }
    }
}