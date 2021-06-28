import './main.scss';
import { Details } from '../details/Details';
import { useLogout } from '../../hooks/use-logout';
import { useLocation } from 'react-router';
import { Context } from '../..';
import { useContext, useEffect } from 'react';
import { RouterPath } from '../../core/enums/router-path';


export function Main() {
  const logout = useLogout();
	const location = useLocation();
	const { store } = useContext(Context);

	useEffect(() => {
		const { pathname } = location;
		if (pathname === RouterPath.LOGOUT) {
			logout().then(() => {
				store.setIsAuth(false);
        store.setUser(null);
			});
		}
	}, [location.pathname]);

	return (
		<div className='main'>
      <Details />
		</div>
	);
}