﻿using AutoMapper;
using Core.DTOs;
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
            string introduction,
            IFile file
            )
        {
            AppUserEntity user = await unitOfWork.userRepository.GetUserByIdAsync(claimsPrincipal.FindFirst("Id").Value);
            
            string imagePath = "";

            if (file != null)
            {
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.Name;

                ImageEntity photo = new ImageEntity
                {
                    Url = "images/" + uniqueFileName
                };

                if (user.Images.Count == 0)
                {
                    photo.IsMain = true;
                }
                else
                {
                    ImageEntity currentMain = user.Images.FirstOrDefault(x => x.IsMain);

                    if (currentMain != null)
                    {
                        currentMain.IsMain = false;
                    }
                    photo.IsMain = true;
                }

                user.Images.Add(photo);
                
                imagePath = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/", uniqueFileName);
                
                await file.CopyToAsync(new FileStream(imagePath, FileMode.Create));
            }
            
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
                PhotoUrl = imagePath,
                City = user.City,
                Country = user.Country,
                DateOfBirth = user.DateOfBirth,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Interests = user.Interests,
                Introduction = user.Introduction
            };
        }
    }
}
