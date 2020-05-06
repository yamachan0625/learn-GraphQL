import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const headersLink = new ApolloLink((operation, foward) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });
  return foward(operation);
});

const endpoint = 'https://api.github.com/graphql';
const httpLink = new HttpLink({ uri: endpoint });
const link = ApolloLink.from([headersLink, httpLink]);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
