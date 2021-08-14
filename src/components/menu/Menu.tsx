import React, { useContext, useEffect, useState } from 'react';
import classes from './menu.module.scss';
import classnames from 'classnames';
import logo from '../../assets/logo.svg';
import { links } from '../../core/data/navigation-link';
import { NavigationLink } from '../navigation-link/NavigationLink';
import { Context } from '../../';

interface IMenuProps {
	onClick: () => void;
}

export function Menu(props: IMenuProps): JSX.Element {
  const [hideMenu, setHideMenu] = useState(true);
  const { store } = useContext(Context);

  useEffect(() => {
    setHideMenu(false);
  }, []);

  const close = () => {
    setHideMenu(true);
    setTimeout(() => props.onClick(), 200);
  };

  return (
    <div className={classes.menu__background} onClick={close}>
      <div
        className={classnames(
          classes.menu,
          hideMenu && classes.menu__hide
        )}
        data-dark={store.configStore.darkMode}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={logo}
          alt=""
          width="220"
          height="220"
          className={classes.menu__img}
          onClick={close}
        />
        <div className={classes.menu__links}>
          {links
            .filter((link) => link.needAuth)
            .map((link) => (
              <NavigationLink link={link} key={link.text} />
            ))}
        </div>
      </div>
    </div>
  );
}
