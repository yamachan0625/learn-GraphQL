import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';
import client from './client';
import { SEARCH_REPOSITORIES } from './graphql';

const DEFAULT_STATE = {
  after: null,
  before: null,
  first: 5,
  last: null,
  query: 'フロントエンドエンジニア',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ ...DEFAULT_STATE, query: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { query, first, last, before, after } = this.state;
    console.log({ query });
    // const { query, first, last, before, after } = DEFAULT_STATE;

    return (
      <ApolloProvider client={client}>
        <form onSubmit={this.handleSubmit}>
          <input value={query} onChange={this.handleChange} />
        </form>
        <Query
          query={SEARCH_REPOSITORIES}
          variables={{ query, first, last, before, after }}
        >
          {({ loading, error, data }) => {
            if (loading) return 'loadng...';
            if (error) return `Error! ${error.message}`;
            console.log({ data });
            return <div></div>;
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
