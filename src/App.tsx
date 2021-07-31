import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import './App.scss';
import Auth from './pages/auth/Auth';
import Main from './pages/main/Main';
import { Context } from './';
import { LocalStorageKey } from './core/enums/local-storage-key';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';


function App() {
	const { store } = useContext(Context);
	const [isLoading, setIsloading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem(LocalStorageKey.TOKEN)) {
			store.userStore.checkAuth().then(() => setIsloading(false));
		} else {
			setIsloading(false);
		}
	}, []);

	if (isLoading) {
		return (
			<div className="loading">
				<ReactLoading
					type={'spinningBubbles'}
					color={'blue'}
					height={150}
					width={150}
				/>
			</div>
		);
	}

	if (store.userStore.isAuth) {
		return (
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		);
	}

	return (
		<div className="App">
			<Auth />
		</div>
	);
}

export default observer(App);
