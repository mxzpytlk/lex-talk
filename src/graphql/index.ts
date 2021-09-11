import { ApolloClient, InMemoryCache, from } from 'apollo-boost';
import { authMiddleware } from '../middleware/auth.middlewre';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { loader } from 'graphql.macro';
import { AuthService } from '../service/auth.service';
import { LocalStorageKey } from '../core/enums/local-storage-key';
import config from '../assets/config.json';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { getAuthHeader } from '../core/utils/api.utils';

const wsLink = new WebSocketLink({
  uri: config.serverSubscriptionUrl,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: getAuthHeader(),
    },
  },
});

export const SERVER_URL = config.serverUrl;
const REFRESH_QUERY = loader('../graphql/queries/refresh.graphql');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const httpLink: any = createUploadLink({
  uri: `${SERVER_URL}/graphql`,
  credentials: 'include',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const splitLink: any = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const logoutLink = onError((data) => {
  const { graphQLErrors, operation, forward } = data;
  const error = graphQLErrors?.[0];

  if (error?.extensions?.code === 'UNAUTHENTICATED') {
    operation.query = REFRESH_QUERY;
    operation.variables = {};
    const res = forward(operation);
    res
      .subscribe((data) => {
        if (data.data?.refresh) {
          AuthService.auth(data.data?.refresh);
        } else {
          localStorage.removeItem(LocalStorageKey.TOKEN);
        }
      },
      (error) => console.log({...error}),
      () => console.log('complete')
      )
      .unsubscribe();
    return res;
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, logoutLink, splitLink]),
});
