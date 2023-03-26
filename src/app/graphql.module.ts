import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
  from,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

const uri = 'http://195.135.253.235/graphql/';

const activityMiddleware = new ApolloLink((operation, forward) => {
  const token: string = JSON.parse(localStorage.getItem('auth'))?.authTokens
    ?.accessToken;
  if (token && !!token.length && token !== 'null') {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }));
    return forward(operation);
  }
  return forward(operation);
});

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: from([
      activityMiddleware,
      httpLink.create({
        uri,
      }),
    ]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
