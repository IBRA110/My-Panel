using API.GraphQL.Account;
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
                .AddMutationType(m => m.Name("Mutation")) 
                .AddType<AccountMutations>()
                .AddType<UsersMutations>()
                .AddQueryType(q => q.Name("Query"))
                .AddType<UsersQueries>()
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
