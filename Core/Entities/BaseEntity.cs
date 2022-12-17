namespace Core.Entities
{
    public class BaseEntity
    {
        public Ulid Id { get; set; } = Ulid.NewUlid();
    }
}