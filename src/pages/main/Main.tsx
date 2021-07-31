import './main.scss';
import Details from '../details/Details';
import { useLogout } from '../../hooks/use-logout';
import { useLocation } from 'react-router';
import { Context } from '../..';
import { useContext, useEffect } from 'react';
import { RouterPath } from '../../core/enums/router-path';
import { observer } from 'mobx-react-lite';
import { AppRouter } from '../../route/AppRouter';


function Main() {
  const logout = useLogout();
	const location = useLocation();
	const { store } = useContext(Context);

	useEffect(() => {
		const { pathname } = location;
		if (pathname === RouterPath.LOGOUT) {
			logout().then(() => {
				store.userStore.setIsAuth(false);
        store.userStore.setUser(null);
			});
		}
	}, [location.pathname]);

  if (!store.userStore.isDetails) {
    return (
      <div className='main'>
        <Details />
      </div>
    );
  }

	return (
    <div className={store.configStore.darkClass('main')}>
      <AppRouter/>
    </div>
  );
}

export default observer(Main);