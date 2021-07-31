import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import './App.scss';
import Auth from './pages/auth/Auth';
import Main from './pages/main/Main';
import { Context } from './';
import { LocalStorageKey } from './core/enums/local-storage-key';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';
import { useChangeLang } from './hooks/use-change-lang';
import { getFromLocalStorage } from './core/utils/local-storage.utils';


function App() {
	const { store } = useContext(Context);
	const [isLoading, setIsloading] = useState(true);
  const changeLang = useChangeLang();

	useEffect(() => {
		if (getFromLocalStorage(LocalStorageKey.TOKEN)) {
			store.userStore.checkAuth()
        .then((isAuth) => {
          isAuth && store.configStore.loadConfig()
        })
        .finally(() => {
          if (store.configStore.lang) {
            changeLang(store.configStore.lang);
          }
          setIsloading(false);
        });
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
