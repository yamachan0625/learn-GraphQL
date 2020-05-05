import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';
import client from './client';
import { ME } from './graphql';

function App() {
  return (
    <ApolloProvider client={client}>
      <div>hello GraphQL</div>
      <Query query={ME}>
        {({ loading, error, data }) => {
          if (loading) return 'loadng...';
          if (error) return `Error! ${error.message}`;
          return <div>{data.user.name}</div>;
        }}
      </Query>
    </ApolloProvider>
  );
}

export default App;
