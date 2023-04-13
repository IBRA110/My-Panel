import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  DefaultOptions,
  InMemoryCache,
  from,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

const uri = 'https://localhost:5000/graphql';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const activityMiddleware = new ApolloLink((operation, forward) => {
  const token: string = JSON.parse(localStorage.getItem('auth'))?.authTokens
    ?.accessToken;
  if (!!token) {
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
    defaultOptions: defaultOptions,
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
