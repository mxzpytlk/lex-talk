import { ApolloLink } from 'apollo-boost';
import { LocalStorageKey } from '../core/enums/local-storage-key';

export const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem(LocalStorageKey.TOKEN)}`,
    }
  }));

  return forward(operation);
});
