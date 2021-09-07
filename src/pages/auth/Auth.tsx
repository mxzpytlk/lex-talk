import Navbar from '../../components/navbar/Navbar';
import animatedLogo from '../../assets/back-animation.svg';
import classes from './auth.module.scss';
import React from 'react';
import { AuthForm } from '../../components/auth-form/AuthForm';

export default function Auth(): JSX.Element {
  return (
    <div className={classes.auth}>
      <Navbar />
      <div className={classes.auth__container}>
        <img className={classes.auth__animated} src={animatedLogo} alt="Animated logo" />
        <AuthForm />
      </div>
    </div>
  );
}
