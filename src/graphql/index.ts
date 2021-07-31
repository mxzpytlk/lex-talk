import { ApolloClient, InMemoryCache, from } from 'apollo-boost';
import { authMiddleware } from '../middleware/auth.middlewre';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { loader } from 'graphql.macro';
import { AuthService } from '../service/auth.service';
import { LocalStorageKey } from '../core/enums/local-storage-key';

export const SERVER_URL = 'http://localhost:5000'
const REFRESH_QUERY = loader('../graphql/queries/refresh.graphql');

const httpLink: any = createUploadLink({ 
  uri: `${SERVER_URL}/graphql`,
  credentials: 'include'
});


const logoutLink = onError((data) => {
  const { graphQLErrors, operation, forward } =  data;
  const error: any = graphQLErrors?.[0];
  if (error?.statusCode === 401) {
    operation.query = REFRESH_QUERY;
    const res = forward(operation);
    res.subscribe((data) => {
      console.log(data);
      if (data.data?.refresh) {
        AuthService.auth(data.data?.refresh);
      } else {
        localStorage.removeItem(LocalStorageKey.TOKEN);
      }
    }).unsubscribe();
    return res;
  }
});


export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, logoutLink, httpLink]),
});
