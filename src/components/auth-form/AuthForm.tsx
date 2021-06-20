import './auth-form.scss';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import { RouterPath } from '../../core/enums/router-path';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function AuthForm() {
  const { t } = useTranslation();
  const match = useRouteMatch();

  const isRegisterPage = () => match.path === '/register';

  return (
    <form action="" className="auth__form">
      <h2 className="auth__title">{t(isRegisterPage() ? 'auth.register' : 'auth.login')}</h2>
      <hr className="auth__hr" />
      <input type="text" placeholder="Email" className="auth__input" />
      <input type="password" placeholder={t('auth.password')} className="auth__input" />
      {isRegisterPage() && <input type="password" placeholder={t('auth.confirm')} className="auth__input" />}
      <p className="auth__message">
        <span>{t(!isRegisterPage() ? 'auth.not_register' : 'auth.already')} </span>
        <a className="auth__message_link" href={isRegisterPage() ? RouterPath.LOGIN : RouterPath.REGISTER}>
          {t(!isRegisterPage() ? 'auth.register' : 'auth.login')}
        </a>
      </p>
      <input type="submit" value={`${t(isRegisterPage() ? 'auth.register' : 'auth.login')}`} className="auth__submit" />
      <h5 className="auth__or">{t('common.or')}</h5>
      <button className="auth__google">
        <FontAwesomeIcon icon={['fab', 'google']} className="auth__google_icon" />
        {t('auth.google')}
      </button>
    </form>
  );
}
