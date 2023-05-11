using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class PresenceHub : Hub
    {
        private readonly PresenceTracker _tracker;
        private readonly IUnitOfWork _unitOfWork;
        public PresenceHub(PresenceTracker tracker, IUnitOfWork unitOfwWork)
        {
            _tracker = tracker;
            _unitOfWork = unitOfwWork;

        }
        public override async Task OnConnectedAsync()
        {
            string userId = Context.User.FindFirst("Id")?.Value;
            
            bool isOnline = await _tracker.UserConnected(userId, Context.ConnectionId);
            
            if (isOnline)
            {
                await Clients.Others.SendAsync("UserIsOnline", userId);
            }
            
            await _unitOfWork.messageRepository.GetCountOfUnreadMessages(Context.User.FindFirst("UserName")?.Value);

            string[] currentUsers = await _tracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string userId = Context.User.FindFirst("Id")?.Value;
            
            AppUserEntity user = await _unitOfWork.userRepository.GetUserByIdAsync(userId);

            bool isOffline = await _tracker.UserDisconnected(userId, Context.ConnectionId);
            
            user.LastActive = DateTime.UtcNow;
            
            await _unitOfWork.Complete();

            if (isOffline)
            {
                await Clients.Others.SendAsync("UserIsOffline", userId);
            }
            
            await base.OnDisconnectedAsync(exception);
        }
    }
}