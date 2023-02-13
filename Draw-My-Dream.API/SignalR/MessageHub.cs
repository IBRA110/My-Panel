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
        private readonly IHubContext<PresenceHub> _presenceHub;
        private readonly PresenceTracker _tracker;
        public MessageHub(IMessageBehaviour messageBehaviour, IMapper mapper, 
            IUserBehaviour userBehaviour, IHubContext<PresenceHub> presenceHub, PresenceTracker tracker)
        {
            _messageBehaviour = messageBehaviour;
            _userBehaviour = userBehaviour;
            _mapper = mapper;
            _presenceHub = presenceHub;
            _tracker = tracker;
        }

        public override async Task OnConnectedAsync()
        {
            HttpContext httpContext = Context.GetHttpContext();

            string otherUser = httpContext.Request.Query["user"].ToString();
            string groupName = GetGroupName(Context.User.FindFirst("UserName")?.Value, otherUser);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await AddToGroup(Context, groupName);

            IEnumerable<MessageDTO> messages = await _messageBehaviour.GetMessageThread(Context.User.FindFirst("UserName")?.Value, otherUser);

            await Clients.Group(groupName).SendAsync("ReceiveMessageThread", messages);

        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await RemoveFromMessageGroup(Context.ConnectionId);

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

            string groupName = GetGroupName(sender.UserName, recipient.UserName);
    
            GroupEntity group = await _messageBehaviour.GetMessageGroup(groupName);

            if (group.Connections.Any(x => x.UserName == recipient.UserName))
            {
                message.DateRead = DateTime.UtcNow;
            }
            else
            {
                List<string> connections = await _tracker.GetConnectionsForUser(recipient.UserName);
                if (connections != null)
                {
                    await _presenceHub.Clients.Clients(connections).SendAsync("NewMessageReceived", 
                        new {username = sender.UserName, knownAs = sender.KnownAs});
                }
            }

            _messageBehaviour.AddMessage(message);

            if (await _messageBehaviour.SaveAllAsync()) 
            {                
                await Clients.Group(groupName).SendAsync("NewMessage", _mapper.Map<MessageDTO>(message));
            }
        }

        private async Task<bool> AddToGroup(HubCallerContext context, string groupName)
        {
            GroupEntity group = await _messageBehaviour.GetMessageGroup(groupName);
            ConnectionEntity connection = new ConnectionEntity(Context.ConnectionId, Context.User.FindFirst("UserName").Value);

            if (group == null)
            {
                group = new GroupEntity(groupName);
                _messageBehaviour.AddGroup(group);
            }

            group.Connections.Add(connection);

            return await _messageBehaviour.SaveAllAsync();
        }

        private async Task RemoveFromMessageGroup(string connectionId)
        {
            ConnectionEntity connection = await _messageBehaviour.GetConnection(connectionId);
            _messageBehaviour.RemoveConnection(connection);
            await _messageBehaviour.SaveAllAsync();
        }

        private string GetGroupName(string caller, string other)
        {
            bool stringCompare = string.CompareOrdinal(caller, other) < 0;

            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }
    }
}