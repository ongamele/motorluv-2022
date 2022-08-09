import React from 'react';
import App from './components/App';
import {
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
//import { InMemoryCache } from 'apollo-cache-inmemory';
//import { createHttpLink } from 'apollo-link-http';
//import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const uploadLink = createUploadLink({
  //uri: 'http://localhost:5000/graphql',
uri: 'https://whispering-temple-08026.herokuapp.com/graphql',
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
