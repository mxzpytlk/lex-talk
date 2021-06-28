import { loader } from 'graphql.macro';
import { useMutation } from 'react-apollo';
import { LocalStorageKey } from '../core/enums/local-storage-key';

const LOGOUT = loader('../graphql/mutations/logout.graphql');

export function useLogout(): () => Promise<void> {
	const [logoutMutation] = useMutation(LOGOUT);

	const register = async () => {
		await logoutMutation();
		localStorage.removeItem(LocalStorageKey.TOKEN);
	};
	return register;
}
