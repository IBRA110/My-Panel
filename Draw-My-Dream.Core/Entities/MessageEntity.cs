namespace Core.Entities
{
    public class MessageEntity
    {
        public int Id { get; set; }
        public Ulid MessageId { get; set; } = Ulid.NewUlid();
        public Ulid SenderId { get; set; }
        public string SenderUserName { get; set; }
        public AppUserEntity Sender { get; set; }
        public Ulid RecipientId { get; set; }
        public string RecipientUserName { get; set; }
        public AppUserEntity Recipient { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.Now;
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; }
    }
}