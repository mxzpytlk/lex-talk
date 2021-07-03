import { ApolloClient, InMemoryCache, from } from 'apollo-boost';
import { authMiddleware } from '../middleware/auth.middlewre';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { loader } from 'graphql.macro';

const REFRESH_QUERY = loader('../graphql/queries/refresh.graphql');

const httpLink: any = createUploadLink({ 
  uri: 'http://localhost:5000/graphql',
  credentials: 'include'
});


const logoutLink = onError((data) => {
  const { graphQLErrors, operation, forward } =  data;
  const error: any = graphQLErrors?.[0];
  if (error?.statusCode === 401) {
    operation.query = REFRESH_QUERY;
    return forward(operation);
  }
});


export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, logoutLink, httpLink]),
});