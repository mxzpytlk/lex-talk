import './navbar.scss';
import logo from '../../assets/logo.svg';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="nav">
      <div className="nav__app">
        <img src={logo} alt="Logo" className="nav__app_logo" />
        <span className="nav__app_name">lextalk</span>
      </div>
      <div className="nav__btns">
        <a href="/" className="nav__btns_active nav__btns_link">
          {t('auth.login')}
          <FontAwesomeIcon icon={['fas', 'sign-in-alt']} className="nav__btns_icon" />
        </a>
        <a href="/" className="nav__btns_link nav__btns_not-active">
          {t('auth.register')}
          <FontAwesomeIcon icon={['fas', 'user-plus']} className="nav__btns_icon" />
          <div className="nav__btns_border"></div>
        </a>
      </div>
    </nav>
  );
}
