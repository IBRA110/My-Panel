using Core.Helpers.Paginations;

namespace Core.Helpers
{
    public class UserParams : PaginationParams
    {
        public string CurrentUsername { get; set; }

        public string OrderBy { get; set; } = "lastActive";
    }
}