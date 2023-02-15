using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Core.Entities;
using Microsoft.AspNetCore.Identity;

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
            
            if (await unitOfWork.UserExists(registerDTO.Username))
            {
                throw new GraphQLException("Username is already taken");
            }
            if (await unitOfWork.EmailExists(registerDTO.Email))
            {
                throw new GraphQLException("Email is already taken");
            }
            
            AppUserEntity user = mapper.Map<AppUserEntity>(registerDTO);
            
            user.UserName = registerDTO.Username;

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
    }
}