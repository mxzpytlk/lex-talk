import { ApolloClient, InMemoryCache, from, HttpLink } from 'apollo-boost';
import { authMiddleware } from '../middleware/auth.middlewre';
import { onError } from 'apollo-link-error';

const httpLink = new HttpLink({ 
  uri: 'http://localhost:5000/graphql',
  credentials: 'include'
});

// const logoutLink = onError((data) => {
//   console.log('HERE');
// });


export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, /* logoutLink,*/ httpLink]),
});