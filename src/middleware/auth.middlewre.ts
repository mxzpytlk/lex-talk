import { ApolloLink } from 'apollo-boost';
import { getAuthHeader } from '../core/utils/api.utils';

export const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: getAuthHeader(),
    }
  }));

  return forward(operation);
});
