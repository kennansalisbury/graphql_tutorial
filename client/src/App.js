import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

//components
import BookList from './components/BookList'

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Ninja's Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
