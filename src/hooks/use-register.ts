import { loader } from 'graphql.macro';
import { ExecutionResult, useMutation } from 'react-apollo';
import { IAuth, IRegisterMutation } from '../core/data/auth-data';

const REGISTER_MUTATION = loader('../graphql/mutations/register.graphql');

export function useRegister(): (
	values: IAuth
) => Promise<ExecutionResult<IRegisterMutation> | undefined> {
	const [registerMutation] = useMutation<IRegisterMutation>(REGISTER_MUTATION);

	const register = async (values: IAuth) => {
		if (values.password === values.repeatPass) {
			try {
				return await registerMutation({ variables: values });
			} catch (e) {
				throw e?.networkError?.result?.errors?.[0] || e;
			}
		}
	};
	return register;
}
