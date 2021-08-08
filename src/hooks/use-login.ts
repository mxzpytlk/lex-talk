import { ApolloQueryResult } from 'apollo-boost';
import { loader } from 'graphql.macro';
import { QueryResult, useLazyQuery } from 'react-apollo';
import { IAuth, ILoginQuery } from '../core/data/auth-data';

const LOGIN_QUERY = loader('../graphql/queries/login.graphql');

export function useLogin(): [
	QueryResult<ILoginQuery, IAuth>,
	(auth: IAuth) => Promise<ApolloQueryResult<ILoginQuery> | undefined>
	] {
	const [loginQuery, loginData] = useLazyQuery<ILoginQuery, IAuth>(LOGIN_QUERY, {
		errorPolicy: 'all',
	});

	const { refetch } = loginData;

	const login = async (auth: IAuth) => {
		if (refetch) {
			const res = await refetch(auth);
			if ('isActivated' in res?.data?.login?.user) {
				const isActivated = res.data.login.user.isActivated;
				if (!isActivated) {
					throw new Error('Please activate account on you email');
				}
			}
			return res;
		} else {
			loginQuery({ variables: auth });
		}
	};
	return [loginData, login];
}
