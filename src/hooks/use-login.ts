import { ApolloQueryResult } from 'apollo-boost';
import { loader } from 'graphql.macro';
import { QueryResult, useLazyQuery } from 'react-apollo';
import { IAuth, ILoginQuery } from '../core/data/auth-data';

const LOGIN_QUERY = loader('../graphql/queries/login.graphql');

export function useLogin(): [
	QueryResult<ILoginQuery, IAuth>,
	(auth: IAuth) => Promise<ApolloQueryResult<ILoginQuery> | undefined>
] 
{
	const [loginQuery, loginData] = useLazyQuery<ILoginQuery, IAuth>(
		LOGIN_QUERY,
		{
			errorPolicy: 'all',
			onError(error) {
				console.log({ ...error });
			},
		}
	);

	const { refetch } = loginData;

	const login = async (auth: IAuth) => {
		if (!!refetch) {
			return await refetch(auth);
		} else {
			loginQuery({ variables: auth });
		}
	};
	return [loginData, login];
}
