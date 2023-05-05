using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using HotChocolate.Authorization;
using System.Security.Claims;

namespace API.GraphQL.Messages
{
    [ExtendObjectType("Mutation")]
    public class MessagesMutations
    {
        [UseProjection]
        [Authorize]
        public async Task<SuccessDTO> DeleteMessage(
            [Service] IUnitOfWork unitOfWork,
            ClaimsPrincipal claimsPrincipal,
            string id)
        {
            string userName = claimsPrincipal.FindFirst("UserName").Value;

            MessageEntity message = await unitOfWork.messageRepository.GetMessage(id);

            if (message.Sender.UserName != userName && message.Recipient.UserName != userName)
            {
                throw new GraphQLException("Failed to delete message");
            }

            if (message.Sender.UserName == userName)
            {
                message.SenderDeleted = true;
            }

            if (message.Recipient.UserName == userName)
            {
                message.RecipientDeleted = true;
            }

            if (message.SenderDeleted && message.RecipientDeleted)
            {
                unitOfWork.messageRepository.DeleteMessage(message);
            }

            if (!await unitOfWork.Complete())
            {
                throw new GraphQLException("Failed to delete message");
            }

            return new SuccessDTO
            {
                Message = "Message deleted!"
            };
        }
    }
}
