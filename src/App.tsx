import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router';
import './App.scss';
import { RouterPath } from './core/enums/router-path';
import Auth from './pages/auth/Auth';
import { ApolloProvider } from 'react-apollo';
import { Context } from './';
import { client } from './graphql/';
import { LocalStorageKey } from './core/enums/local-storage-key';
import { observer } from 'mobx-react-lite';

function App() {
	const { store } = useContext(Context);

	useEffect(() => {
		if (localStorage.getItem(LocalStorageKey.TOKEN)) {
			store.checkAuth();
		}
	}, []);

	if (store.isAuth) {
		return <h1>SUCCESS</h1>;
	}

	return (
		<div className="App">
			<ApolloProvider client={client}>
				<Route path={RouterPath.LOGIN}>
					<Auth />
				</Route>
				<Route path={RouterPath.REGISTER}>
					<Auth />
				</Route>
				<Route path={RouterPath.DEFAULT}>
					<Auth />
				</Route>
			</ApolloProvider>
		</div>
	);
}

export default observer(App);
