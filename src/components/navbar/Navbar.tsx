import './navbar.scss';
import logo from '../../assets/logo.svg';
import React, { useContext } from 'react';
import { NavigationLink } from '../navigation-link/NavigationLink';
import { INavigationLink, links } from '../../core/data/navigation-link';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

function Navbar() {
	const { store } = useContext(Context);

	const isActive = (link: INavigationLink) => store.userStore.isAuth === link.needAuth;

	return (
		<nav className={store.configStore.darkClass('nav')}>
			<div className="nav__app">
				<img src={logo} alt="Logo" className="nav__app_logo" />
				<span className="nav__app_name">lextalk</span>
			</div>
			<div className="nav__btns">
				{links.filter(isActive).map((link) => (
					<NavigationLink link={link} key={link.text} />
				))}
			</div>
		</nav>
	);
}

export default observer(Navbar);
