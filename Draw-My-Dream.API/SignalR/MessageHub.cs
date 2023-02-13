using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Core.Entities;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MessageHub : Hub
    {
        
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        private readonly IHubContext<PresenceHub> _presenceHub;
        private readonly PresenceTracker _tracker;
        public MessageHub(IUnitOfWork unitOfWork, IMapper mapper, IHubContext<PresenceHub> presenceHub, PresenceTracker tracker)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _presenceHub = presenceHub;
            _tracker = tracker;
        }

        public override async Task OnConnectedAsync()
        {
            HttpContext httpContext = Context.GetHttpContext();
            
            string user = Context.User.FindFirst("UserName")?.Value;
            
            string otherUser = httpContext.Request.Query["user"].ToString();
            string groupName = GetGroupName(user, otherUser);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            GroupEntity group = await AddToGroup(groupName);

            await Clients.Group(groupName).SendAsync("UpdatedGroup", group);

            IEnumerable<MessageDTO> messages = await _unitOfWork.messageBehaviour.GetMessageThread(user, otherUser);

            if (_unitOfWork.HasChanges())
            {
                await _unitOfWork.Complete();
            }
            
            await Clients.Caller.SendAsync("ReceiveMessageThread", messages);

        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            GroupEntity group = await RemoveFromMessageGroup();
            await Clients.Group(group.Name).SendAsync("UpdatedGroup", group);

            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(CreateMessageDTO createMessageDTO)
        {
            AppUserEntity sender = await _unitOfWork.userBehaviour.GetUserByIdAsync(Context.User.FindFirst("Id").Value);
            
            if (sender.FirstName == createMessageDTO.RecipientUserName.ToLower())
            {
                throw new HubException("You cannot send messages to yourself");
            }
            
            AppUserEntity recipient = await _unitOfWork.userBehaviour.GetUserByUsernameAsync(createMessageDTO.RecipientUserName);
            
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
    
            GroupEntity group = await _unitOfWork.messageBehaviour.GetMessageGroup(groupName);

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

            _unitOfWork.messageBehaviour.AddMessage(message);

            if (await _unitOfWork.Complete()) 
            {                
                await Clients.Group(groupName).SendAsync("NewMessage", _mapper.Map<MessageDTO>(message));
            }
        }

        private async Task<GroupEntity> AddToGroup(string groupName)
        {
            GroupEntity group = await _unitOfWork.messageBehaviour.GetMessageGroup(groupName);
            ConnectionEntity connection = new ConnectionEntity(Context.ConnectionId, Context.User.FindFirst("UserName").Value);

            if (group == null)
            {
                group = new GroupEntity(groupName);
                _unitOfWork.messageBehaviour.AddGroup(group);
            }

            group.Connections.Add(connection);

            if (await _unitOfWork.Complete())
            {
                return group;
            }

            throw new HubException("Failed to join group");
        }

        private async Task<GroupEntity> RemoveFromMessageGroup()
        {
            GroupEntity group = await _unitOfWork.messageBehaviour.GetGroupForConnection(Context.ConnectionId);
            ConnectionEntity connection = group.Connections.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
            _unitOfWork.messageBehaviour.RemoveConnection(connection);
            if (await _unitOfWork.Complete())
            {
                return group;
            }

            throw new HubException("Failed to remove from group");
        }

        private string GetGroupName(string caller, string other)
        {
            bool stringCompare = string.CompareOrdinal(caller, other) < 0;

            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }
    }
}