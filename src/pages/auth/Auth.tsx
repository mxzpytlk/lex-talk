import { Navbar } from '../../components/navbar/Navbar';
import animatedLogo from '../../assets/back-animation.svg';
import './auth.scss';
import React from 'react';
import { AuthForm } from '../../components/auth-form/AuthForm';

export function Auth() {


  return (
    <div className="auth">
      <Navbar />
      <div className="auth__container">
        <img className="auth__animated" src={animatedLogo} alt="Animated logo" />
        <AuthForm />
      </div>
    </div>
  );
}
