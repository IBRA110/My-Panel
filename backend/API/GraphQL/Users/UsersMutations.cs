using AutoMapper;
using Core.DTOs.ImageDTOs;
using Core.DTOs.UserDTOs;
using Core.Entities;
using Core.Interfaces;
using HotChocolate.Authorization;
using System.Security.Claims;

namespace API.GraphQL.Users
{
    [ExtendObjectType("Mutation")]
    public class UsersMutations
    {
        [UseProjection]
        [Authorize]
        public async Task<MemberUpdateDTO> UpdateUser(
            [Service] IUnitOfWork unitOfWork,
            [Service] IMapper mapper,
            ClaimsPrincipal claimsPrincipal,
            string city,
            string country,
            DateTime dateOfBirth,
            string firstName,
            string lastName,
            string interests,
            string introduction
            )
        {
            AppUserEntity user = await unitOfWork.userRepository.GetUserByIdAsync(claimsPrincipal.FindFirst("Id").Value);

            MemberUpdateDTO memberUpdateDTO = new MemberUpdateDTO
            {
                City = city,
                Country = country,
                DateOfBirth = dateOfBirth,
                FirstName = firstName,
                LastName = lastName,
                Interests = interests,
                Introduction = introduction
            };

            mapper.Map(memberUpdateDTO, user);

            unitOfWork.userRepository.Update(user);

            if (!await unitOfWork.Complete())
            {
                throw new GraphQLException("Failed to update user");
            }

            return new MemberUpdateDTO
            {
                City = user.City,
                Country = user.Country,
                DateOfBirth = user.DateOfBirth,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Interests = user.Interests,
                Introduction = user.Introduction
            };
        }

        [UseProjection]
        [Authorize]
        public async Task<ImageUpdateDTO> UploadUserAvatar([Service] IUnitOfWork unitOfWork, ClaimsPrincipal claimsPrincipal, IFile file)
        {
            AppUserEntity user = await unitOfWork.userRepository.GetUserByIdAsync(claimsPrincipal.FindFirst("Id").Value);

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.Name;

            ImageEntity photo = new ImageEntity
            {
                Url = "images/" + uniqueFileName
            };

            if (user.Images.Count == 0)
            {
                photo.IsMain = true;
            }

            user.Images.Add(photo);

            if (!await unitOfWork.Complete())
            {
                throw new GraphQLException("Failed to update user");
            }

            string imagePath = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/", uniqueFileName);
            await file.CopyToAsync(new FileStream(imagePath, FileMode.Create));


            return new ImageUpdateDTO
            {
                Url = photo.Url
            };
        }
    }
}
