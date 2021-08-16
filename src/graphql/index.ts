import { ApolloClient, InMemoryCache, from } from 'apollo-boost';
import { authMiddleware } from '../middleware/auth.middlewre';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { loader } from 'graphql.macro';
import { AuthService } from '../service/auth.service';
import { LocalStorageKey } from '../core/enums/local-storage-key';
import config from '../assets/config.json';

export const SERVER_URL = config.serverUrl;
const REFRESH_QUERY = loader('../graphql/queries/refresh.graphql');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const httpLink: any = createUploadLink({
  uri: `${SERVER_URL}/graphql`,
  credentials: 'include',
});

const logoutLink = onError((data) => {
  const { graphQLErrors, operation, forward } = data;
  const error = graphQLErrors?.[0];

  if (error?.extensions?.code === 'UNAUTHENTICATED') {
    operation.query = REFRESH_QUERY;
    const res = forward(operation);
    res
      .subscribe((data) => {
        console.log('HERE');
        if (data.data?.refresh) {
          AuthService.auth(data.data?.refresh);
        } else {
          localStorage.removeItem(LocalStorageKey.TOKEN);
        }
      })
      .unsubscribe();
    return res;
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, logoutLink, httpLink]),
});
