using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using HotChocolate.Authorization;
using Mysqlx.Crud;
using System.Diagnostics.Metrics;
using System.Security.Claims;
using System.Security.Policy;

namespace API.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class UsersMutations
    {
        [UseProjection]
        [Authorize]
        public async Task<MemberUpdateDTO> UpdateUser(
            [Service] IUnitOfWork unitOfWork, ClaimsPrincipal claimsPrincipal,
            [Service] IMapper mapper,
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

    }
}
