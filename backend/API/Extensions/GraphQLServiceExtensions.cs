using API.GraphQL.Account;
using API.GraphQL.CalendarEvents;
using API.GraphQL.Users;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class GraphQLServiceExtensions
    {
        public static IServiceCollection AddGraphQLServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddGraphQLServer()
                .AddProjections()
                .AddAuthorization()
                .AddFiltering()
                .AddSorting()
                .AddMutationType(m => m.Name("Mutations")) 
                .AddType<AccountMutations>()
                .AddType<CalendarEventMutations>()
                .AddType<UsersMutations>()
                .AddType<UploadType>()
                .AddQueryType(q => q.Name("Queries"))
                .AddType<MemberDTOTypeExtension>()
                .AddType<CalendarEventDTOExtension>()
                .AddType<ImageDTOTypeExtension>()
                .AddType<UsersQueries>()
                .AddType<CalendarEventQueries>()
                .AddErrorFilter(er =>
                {
                    switch (er.Exception)
                    {
                        case ArgumentException argexc:
                            return ErrorBuilder.FromError(er)
                            .SetMessage(argexc.Message)
                            .SetCode("ArgumentException")
                            .RemoveException()
                            .ClearExtensions()
                            .ClearLocations()
                            .Build();
                        case DbUpdateException dbupdateexc:

                            if (dbupdateexc.InnerException.Message.IndexOf("UNIQUE constraint failed") > -1)
                                return ErrorBuilder.FromError(er)
                               .SetMessage(dbupdateexc.InnerException.Message)
                               .SetCode("UNIQUE constraint failed")
                               .RemoveException()
                               .ClearExtensions()
                               .ClearLocations()
                               .Build();

                            break;
                    }
                    return er;
                });

            return services;
        }
    }
}
