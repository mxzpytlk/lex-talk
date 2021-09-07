import Navbar from '../../components/navbar/Navbar';
import animatedLogo from '../../assets/back-animation.svg';
import classes from './auth.module.scss';
import React, { useContext } from 'react';
import { AuthForm } from '../../components/auth-form/AuthForm';
import { Context } from '../../';
import { observer } from 'mobx-react-lite';
import { ScreenSize } from '../../store/models/screen-size.store';

function Auth(): JSX.Element {
  const {
    store: { screenSizeStore },
  } = useContext(Context);

  return (
    <div className={classes.auth}>
      <Navbar />
      {screenSizeStore.screenSize >= ScreenSize.SMALL_LAPTOP ? (
        <div className={classes.auth__container}>
          <img className={classes.auth__animated} src={animatedLogo} alt="Animated logo" />
          <AuthForm />
        </div>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}

export default observer(Auth);
