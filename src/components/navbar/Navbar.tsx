import classes from './navbar.module.scss';
import logo from '../../assets/logo.svg';
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import NavLinks from './nav-links/NavLinks';

function Navbar(): JSX.Element {
  const {
    store: { configStore },
  } = useContext(Context);

  return (
    <nav className={classes.nav} data-dark={configStore.darkMode}>
      <div className={classes.nav__container}>
        <div className={classes.nav__app}>
          <img src={logo} alt="Logo" className={classes.nav__app_logo} />
          <span className={classes.nav__app_name}>lextalk</span>
        </div>
        <NavLinks />
      </div>
    </nav>
  );
}

export default observer(Navbar);
