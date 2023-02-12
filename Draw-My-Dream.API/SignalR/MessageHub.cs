using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Core.Entities;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MessageHub : Hub
    {
        private readonly IMessageBehaviour _messageBehaviour;
        private readonly IMapper _mapper;
        private readonly IUserBehaviour _userBehaviour;
        public MessageHub(IMessageBehaviour messageBehaviour, IMapper mapper, IUserBehaviour userBehaviour)
        {
            _messageBehaviour = messageBehaviour;
            _userBehaviour = userBehaviour;
            _mapper = mapper;
        }

        public override async Task OnConnectedAsync()
        {
            HttpContext httpContext = Context.GetHttpContext();

            string otherUser = httpContext.Request.Query["user"].ToString();

            string groupName = GetGroupName(Context.User.FindFirst("UserName")?.Value, otherUser);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            IEnumerable<MessageDTO> messages = await _messageBehaviour.GetMessageThread(Context.User.FindFirst("UserName")?.Value, otherUser);

            await Clients.Group(groupName).SendAsync("ReceiveMessageThread", messages);

        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(CreateMessageDTO createMessageDTO)
        {
            AppUserEntity sender = await _userBehaviour.GetUserByIdAsync(Context.User.FindFirst("Id").Value);
            
            if (sender.FirstName == createMessageDTO.RecipientUserName.ToLower())
            {
                throw new HubException("You cannot send messages to yourself");
            }
            
            AppUserEntity recipient = await _userBehaviour.GetUserByUsernameAsync(createMessageDTO.RecipientUserName);
            
            if (recipient == null)
            {
                throw new HubException("Not found user");
            }
            
            MessageEntity message = new MessageEntity
            {
                Sender = sender,
                Recipient = recipient,
                SenderUserName = sender.UserName,
                RecipientUserName = recipient.UserName,
                Content = createMessageDTO.Content
            };
 
            _messageBehaviour.AddMessage(message);

            if (await _messageBehaviour.SaveAllAsync()) 
            {
                string group = GetGroupName(sender.UserName, recipient.UserName);
                await Clients.Group(group).SendAsync("NewMessage", _mapper.Map<MessageDTO>(message));
            }
        }

        private string GetGroupName(string caller, string other)
        {
            bool stringCompare = string.CompareOrdinal(caller, other) < 0;

            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }
    }
}