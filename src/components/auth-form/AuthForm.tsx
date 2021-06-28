import './auth-form.scss';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import { RouterPath } from '../../core/enums/router-path';
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form } from 'formik';
import { IAuth } from '../../core/data/auth-data';
import { useLogin } from '../../hooks/use-login';
import { Context } from '../..';
import { useRegister } from '../../hooks/use-register';

export function AuthForm() {
	const { t } = useTranslation();
	const match = useRouteMatch();

  const { store } = useContext(Context);

  const [errMessage, setErrMessage] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [{ data: loginData, error: loginError }, login] = useLogin();
  const register = useRegister();

  useEffect(() => {
    if (loginError?.message) {
      const message = (loginError.networkError as any)
        ?.result?.errors?.[0]?.message;

      if (message) {
        setErrMessage(message);
      }
    }
  },
  [loginError]);

  if (loginData?.login) {
    store.auth(loginData.login);
  }

	const isRegisterPage = () => match.path === '/register';

	const validate = (values: IAuth) => {
    const { email, password, repeatPass } = values;
		if (!email || !password) {
			return { isValid: false };
		}
    if (isRegisterPage() && password !== repeatPass) {
			return { isValid: false };
    }
    if (password.length < 6) {
      return { isValid: false };
    }
		return {};
	};

	const submit = async (values: IAuth) => {

    let successAuth;

    if (isRegisterPage()) {
      let registerData;
      try {
        registerData = await register(values);
        setRegisterSuccess(true);
      } catch(e) {
        setErrMessage(e.message || '');
      }
      const error = registerData?.errors?.[0];
      if (error) {
        setErrMessage(error.message);
      }
      successAuth = registerData?.data?.register;
    } else {
      try {
        const loginData = await login(values);
        successAuth = loginData?.data?.login;
      } catch(e) {
        const message = (e?.networkError as any)
        ?.result?.errors?.[0]?.message;

        if (message) {
          setErrMessage(message);
        }
      }
    }

    if (successAuth) {
      store.auth(successAuth);
    }
	};


	return (
		<div className="auth__form">
			<Formik
				initialValues={{ email: '', password: '' }}
				validate={validate}
				onSubmit={submit}
			>
				<Form>
					<h2 className="auth__title">
						{t(isRegisterPage() ? 'auth.register' : 'auth.login')}
					</h2>
					<hr className="auth__hr" />
					<Field
						type="email"
						placeholder="Email"
						className="auth__input"
						name="email"
					/>
					<Field
						type="password"
						placeholder={t('auth.password')}
						className="auth__input"
						name="password"
					/>
					{isRegisterPage() && (
						<Field
							type="password"
							placeholder={t('auth.confirm')}
							className="auth__input"
              name='repeatPass'
						/>
					)}
					<p className="auth__message">
						<span>
							{t(!isRegisterPage() ?
                'auth.not_register' : 'auth.already')}{' '}
						</span>
						<a
							className="auth__message_link"
							href={isRegisterPage() ?
                RouterPath.LOGIN : RouterPath.REGISTER}
						>
							{t(!isRegisterPage() ?
                'auth.register' : 'auth.login')}
						</a>
					</p>
					<input
						type="submit"
						value={`${t(isRegisterPage() ?
              'auth.register' : 'auth.login')}`}
						className="auth__submit"
						name="submit"
					/>
          {!!errMessage && <span className='auth__err'>{t(errMessage)}</span>}
          {registerSuccess && <span className='auth__success'>
            {t('auth.success')}
          </span>}
				</Form>
			</Formik>
		</div>
	);
}
