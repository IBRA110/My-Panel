using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class PresenceHub : Hub
    {
        private readonly PresenceTracker _tracker;
        public PresenceHub(PresenceTracker tracker)
        {
            _tracker = tracker;

        }
        public override async Task OnConnectedAsync()
        {
            string user = Context.User.FindFirst("UserName")?.Value;
            
            await _tracker.UserConnected(user, Context.ConnectionId);
            await Clients.Others.SendAsync("UserIsOnline", user);

            string[] currentUsers = await _tracker.GetOnlineUsers();
            await Clients.All.SendAsync("GetOnlineUsers", currentUsers);
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string user = Context.User.FindFirst("UserName")?.Value;
            
            await _tracker.UserDisconected(user, Context.ConnectionId);
            await Clients.Others.SendAsync("UserIsOffline", user);

            string[] currentUsers = await _tracker.GetOnlineUsers();
            await Clients.All.SendAsync("GetOnlineUsers", currentUsers);

            await base.OnDisconnectedAsync(exception);
        }
    }
}