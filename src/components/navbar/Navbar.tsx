import './navbar.scss';
import logo from '../../assets/logo.svg';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import classNames from 'classnames';

export function Navbar() {
  const { t } = useTranslation();
  const match = useRouteMatch();

  const pathDict: Record<string, string[]> = {
    login: ['/', '/login'],
    register: ['/register'],
  };

  const isActive = (path: string) => pathDict[path].find((item) => item === match.path);

  return (
    <nav className="nav">
      <div className="nav__app">
        <img src={logo} alt="Logo" className="nav__app_logo" />
        <span className="nav__app_name">lextalk</span>
      </div>
      <div className="nav__btns">
        <a href="/login" className={classNames('nav__btns_link', isActive('login') ? 'nav__btns_active' : 'nav__btns_not-active')}>
          {t('auth.log_in')}
          <FontAwesomeIcon icon={['fas', 'sign-in-alt']} className="nav__btns_icon" />
          <div className="nav__btns_border"></div>
        </a>
        <a href="/register" className={classNames('nav__btns_link', isActive('register') ? 'nav__btns_active' : 'nav__btns_not-active')}>
          {t('auth.register')}
          <FontAwesomeIcon icon={['fas', 'user-plus']} className="nav__btns_icon" />
          <div className="nav__btns_border"></div>
        </a>
      </div>
    </nav>
  );
}
