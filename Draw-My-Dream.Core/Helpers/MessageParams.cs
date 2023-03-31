using Core.Helpers.Paginations;

namespace Core.Helpers
{
    public class MessageParams : PaginationParams
    {
        public string UserName { get; set; }
        public string Container { get; set; } = "Unread";
    }
}