import { loader } from 'graphql.macro';
import { useContext } from 'react';
import { useMutation } from 'react-apollo';
import { LocalStorageKey } from '../core/enums/local-storage-key';
import { Context } from '../';

const LOGOUT = loader('../graphql/mutations/logout.graphql');

export function useLogout(): () => Promise<void> {
  const [logoutMutation] = useMutation(LOGOUT);
  const { store } = useContext(Context);
  const { userStore, messageStore } = store;

  const logout = async () => {
    await logoutMutation();
    localStorage.removeItem(LocalStorageKey.TOKEN);
    userStore.setIsAuth(false);
    userStore.setUser(null);
    messageStore.removeContacts();
  };
  return logout;
}
