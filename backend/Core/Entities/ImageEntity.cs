using System;

namespace Core.Entities
{ 
    public class ImageEntity
    {
        public Ulid Id { get; set; } = Ulid.NewUlid();
        public string Url { get; set; }
        public AppUserEntity AppUser { get; set; }
        public Ulid AppUserId { get; set; }
        public bool IsMain { get; set; }
    }
}