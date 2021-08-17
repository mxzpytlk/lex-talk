import classes from './main.module.scss';
import Details from '../details/Details';
import { useLogout } from '../../hooks/use-logout';
import { useLocation } from 'react-router';
import { Context } from '../..';
import { useContext, useEffect } from 'react';
import { RouterPath } from '../../core/enums/router-path';
import { observer } from 'mobx-react-lite';
import { AppRouter } from '../../route/AppRouter';
import Modal from '../../components/modal/Modal';

function Main() {
  const logout = useLogout();
  const location = useLocation();
  const {
    store: { userStore, messageStore, configStore, modalStore },
  } = useContext(Context);

  useEffect(() => {
    const { pathname } = location;
    if (pathname === RouterPath.LOGOUT) {
      logout().then(() => {
        messageStore.removeContacts();
      });
    }
  }, [location.pathname]);

  if (!userStore.isDetails) {
    return (
      <div className={classes.main} data-dark={configStore.darkMode}>
        <Details />
      </div>
    );
  }

  return (
    <div className={classes.main} data-dark={configStore.darkMode}>
      {modalStore.isOpen && <Modal close={() => modalStore.close()}>{modalStore.child}</Modal>}
      <AppRouter />
    </div>
  );
}

export default observer(Main);
