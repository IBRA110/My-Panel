using Core.DTOs;
using API.Extensions;
using Core.Helpers;
using Core.Interfaces;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public MessagesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessageUser([FromQuery] MessageParams messageParams)
        {
            messageParams.UserName = User.FindFirst("UserName").Value;
            
            PagedList<MessageDTO> messages = await _unitOfWork.messageRepository.GetMessagesForUser(messageParams);
            
            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);

            return messages;
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteMessage(Ulid id)
        {
            string userName = User.FindFirst("UserName").Value;
            MessageEntity message = await _unitOfWork.messageRepository.GetMessage(id);

            if (message.Sender.UserName != userName && message.Recipient.UserName != userName)
            {
                return Unauthorized();
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
                _unitOfWork.messageRepository.DeleteMessage(message);
            }

            if (await _unitOfWork.Complete())
            {
                return Ok();
            }
            
            return BadRequest("Problem deleting the message");
        }
    }
}