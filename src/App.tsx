import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import classes from './App.module.scss';
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
  const { configStore, userStore } = store;
  const [isLoading, setIsloading] = useState(true);
  const changeLang = useChangeLang();

  useEffect(() => {
    if (getFromLocalStorage(LocalStorageKey.TOKEN)) {
      store.userStore.checkAuth().then(() => setIsloading(false));
    } else {
      setIsloading(false);
    }
  }, []);

  useEffect(() => {
    if (userStore.isAuth) {
      configStore.loadConfig()
        .finally(() => {
          changeLang(configStore.lang);
          setIsloading(false);
        });
    }
  }, [userStore.isAuth]);

  if (isLoading) {
    return (
      <div className={classes.loading} data-dark={configStore.darkMode}>
        <ReactLoading type={'spinningBubbles'} color={'blue'} height={150} width={150} />
      </div>
    );
  }

  if (userStore.isAuth) {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  }

  return (
    <div className={classes.app} data-dark={configStore.darkMode}>
      <Auth />
    </div>
  );
}

export default observer(App);
