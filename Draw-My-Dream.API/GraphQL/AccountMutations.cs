using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
            RegisterDTO registerDTO)
        {
            
            if (await unitOfWork.UserExists(registerDTO.UserName))
            {
                throw new GraphQLException("Username is already taken");
            }
            if (await unitOfWork.EmailExists(registerDTO.Email))
            {
                throw new GraphQLException("Email is already taken");
            }
            
            AppUserEntity user = mapper.Map<AppUserEntity>(registerDTO);
            
            user.UserName = registerDTO.UserName;

            IdentityResult result = await userManager.CreateAsync(user, registerDTO.Password);

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
            LoginDTO loginDTO)
        {
            AppUserEntity user = await userManager.Users
                    .Include(u => u.Images)
                    .SingleOrDefaultAsync(x => x.UserName.ToLower() == loginDTO.UserName.ToLower());

            if (user == null)
            {
                throw new GraphQLException("User does not exist!");
            }

            SignInResult result = await signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

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
    }
}