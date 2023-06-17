using Core.DTOs.ImageDTOs;
using Core.DTOs.UserDTOs;

namespace API.Extensions
{
    public class TypeExtensions
    {
    }

    public class MemberDTOTypeExtension : ObjectType<MemberDTO>
    {
        protected override void Configure(IObjectTypeDescriptor<MemberDTO> descriptor)
        {
            descriptor.Name("MemberDTO");

            descriptor.Field(f => f.Id).Type<IdType>();
        }
    }

    public class MemberDTOExtension : ObjectType
    {
        protected override void Configure(IObjectTypeDescriptor descriptor)
        {
            descriptor.Name(OperationTypeNames.Query);

            descriptor
                .Field("MemberDTO")
                .Argument("id", a => a.Type<IdType>())
                .Type<MemberDTOTypeExtension>()
                .Resolve(context =>
                {
                    var id = context.ArgumentValue<string>("id");

                    return id;
                });
        }
    }

    public class ImageDTOTypeExtension : ObjectType<ImageDTO>
    {
        protected override void Configure(IObjectTypeDescriptor<ImageDTO> descriptor)
        {
            descriptor.Name("ImageDTO");

            descriptor.Field(f => f.Id).Type<IdType>();
        }
    }

    public class ImageDTOExtension : ObjectType
    {
        protected override void Configure(IObjectTypeDescriptor descriptor)
        {
            descriptor.Name(OperationTypeNames.Query);

            descriptor
                .Field("ImageDTO")
                .Argument("id", a => a.Type<IdType>())
                .Type<ImageDTOTypeExtension>()
                .Resolve(context =>
                {
                    var id = context.ArgumentValue<string>("id");

                    return id;
                });
        }
    }
}
