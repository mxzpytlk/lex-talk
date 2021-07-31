import { ApolloLink } from 'apollo-boost';
import { LocalStorageKey } from '../core/enums/local-storage-key';
import { getFromLocalStorage } from '../core/utils/local-storage.utils';

export const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${getFromLocalStorage(LocalStorageKey.TOKEN)}`,
    }
  }));

  return forward(operation);
});
