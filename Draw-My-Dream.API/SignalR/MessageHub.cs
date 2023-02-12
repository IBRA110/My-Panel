using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MessageHub : Hub
    {
        private readonly IMessageBehaviour _messageBehaviour;
        private readonly IMapper _mapper;
        public MessageHub(IMessageBehaviour messageBehaviour, IMapper mapper)
        {
            _messageBehaviour = messageBehaviour;
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

        private string GetGroupName(string caller, string other)
        {
            bool stringCompare = string.CompareOrdinal(caller, other) < 0;

            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }
    }
}