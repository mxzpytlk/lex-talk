import React, { useEffect, useState } from 'react';
import './menu.scss';
import classnames from 'classnames';
import logo from '../../assets/logo.svg';
import { links } from '../../core/data/navigation-link';
import { NavigationLink } from '../navigation-link/NavigationLink';

interface IMenuProps {
	onClick: () => void;
}

export function Menu(props: IMenuProps) {
	const [hideMenu, setHideMenu] = useState(true);
	useEffect(() => {
		setHideMenu(false);
	}, []);

	const close = () => {
		setHideMenu(true);
		setTimeout(() => props.onClick(), 200);
	};



	return (
		<div className="menu__background" onClick={close}>
			<div
				className={classnames('menu', hideMenu && 'menu__hide')}
				onClick={(e) => e.stopPropagation()}
			>
				<img
          src={logo}
          alt=""
          width="220"
          height="220"
          className="menu__img"
          onClick={close} 
        />
        <div className='menu__links'>
          {links
            .filter((link) => link.needAuth)
            .map((link) => <NavigationLink link={link} key={link.text} />)}
        </div>
			</div>
		</div>
	);
}
