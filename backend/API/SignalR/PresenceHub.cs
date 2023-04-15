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
            string userId = Context.User.FindFirst("Id")?.Value;
            
            bool isOnline = await _tracker.UserConnected(userId, Context.ConnectionId);
            if (isOnline)
            {
                await Clients.Others.SendAsync("UserIsOnline", userId);
            }            

            string[] currentUsers = await _tracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string user = Context.User.FindFirst("UserName")?.Value;
            
            bool isOffline = await _tracker.UserDisconected(user, Context.ConnectionId);
            
            if (isOffline)
            {
                await Clients.Others.SendAsync("UserIsOffline", user);
            }
            
            await base.OnDisconnectedAsync(exception);
        }
    }
}