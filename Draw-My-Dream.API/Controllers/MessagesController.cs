using API.DTOs;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IUserBehaviour _userBehaviour;
        private readonly IMessageBehaviour _messageBehaviour;
        private readonly IMapper _mapper;
        public MessagesController(IUserBehaviour userBehaviour, IMessageBehaviour messageBehaviour, IMapper mapper)
        {
            _userBehaviour = userBehaviour;
            _messageBehaviour = messageBehaviour;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessageUser([FromQuery] MessageParams messageParams)
        {
            messageParams.UserName = User.FindFirst("UserName").Value;
            
            PagedList<MessageDTO> messages = await _messageBehaviour.GetMessagesForUser(messageParams);
            
            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);

            return messages;
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessageThread(string username)
        {
            string currentUserName = User.FindFirst("UserName").Value;

            return Ok(await _messageBehaviour.GetMessageThread(currentUserName, username));
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteMessage(string id)
        {
            string userName = User.FindFirst("UserName").Value;
            MessageEntity message = await _messageBehaviour.GetMessage(id);

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
                _messageBehaviour.DeleteMessage(message);
            }

            if (await _messageBehaviour.SaveAllAsync())
            {
                return Ok();
            }
            
            return BadRequest("Problem deleting the message");
        }
    }
}