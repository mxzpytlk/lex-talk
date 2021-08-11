import classes from './navbar.module.scss';
import logo from '../../assets/logo.svg';
import React, { useContext } from 'react';
import { NavigationLink } from '../navigation-link/NavigationLink';
import { INavigationLink, links } from '../../core/data/navigation-link';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

function Navbar(): JSX.Element {
	const { store } = useContext(Context);

	const isActive = (link: INavigationLink) => store.userStore.isAuth === link.needAuth;

	return (
		<nav className={classes.nav} data-dark={store.configStore.darkMode}>
			<div className={classes.nav__app}>
				<img src={logo} alt="Logo" className={classes.nav__app_logo} />
				<span className={classes.nav__app_name}>lextalk</span>
			</div>
			<div className={classes.nav__btns}>
				{links.filter(isActive).map((link) => (
					<NavigationLink link={link} key={link.text} />
				))}
			</div>
		</nav>
	);
}

export default observer(Navbar);
