using System.Security.Claims;
using API.DTOs;
using API.Interfaces;
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
            RegisterDTO register)
        {
            
            if (await unitOfWork.UserExists(register.UserName))
            {
                throw new GraphQLException("Username is already taken");
            }
            if (await unitOfWork.EmailExists(register.Email))
            {
                throw new GraphQLException("Email is already taken");
            }
            
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
            LoginDTO login)
        {
            AppUserEntity user = await userManager.Users
                    .Include(u => u.Images)
                    .SingleOrDefaultAsync(x => x.UserName.ToLower() == login.UserName.ToLower());

            if (user == null)
            {
                throw new GraphQLException("User does not exist!");
            }

            SignInResult result = await signInManager.CheckPasswordSignInAsync(user, login.Password, false);

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
            RefreshTokenDTO refreshToken)
        {
            Console.WriteLine(claimsPrincipal.FindFirst("Id").Value);
            AppUserEntity user = await unitOfWork.userBehaviour.GetUserByIdAsync(claimsPrincipal.FindFirst("Id").Value);

            if (user == null || refreshToken.RefreshToken != user.RefreshToken)
            {
                Console.WriteLine(refreshToken.RefreshToken);
                Console.WriteLine(user.RefreshToken);
                Console.WriteLine(user.UserName);
                throw new ArgumentException("Something went wrong!");
            }
            Console.WriteLine(user.Email, "3");
            Console.WriteLine("2", user.UserName);
            user.RefreshToken = tokenService.CreateRefreshToken(user);

            await unitOfWork.Complete();
            
            return new LoginResponseDTO
            {
                AccessToken = await tokenService.CreateAccessToken(user),
                RefreshToken = user.RefreshToken
            };
        }
    }
}