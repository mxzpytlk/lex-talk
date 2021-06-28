import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
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
  const [isLoading, setIsloading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem(LocalStorageKey.TOKEN)) {
			store.checkAuth().then(() => setIsloading(false));
		} else {
      setIsloading(false);
    }

	}, []);

	if (isLoading) {
		return (
      <div className='loading'>
				<ReactLoading 
          type={'spinningBubbles'}
          color={'blue'}
          height={150}
          width={150} />
			</div>
		);
	}

	if (store.isAuth) {
		return (
			<h1>Success</h1>
		);
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
