import React from 'react';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import client from './client';

const ME = gql`
  query me {
    user(login: "iteachonudemy") {
      name
      avatarUrl
    }
  }
`;
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
