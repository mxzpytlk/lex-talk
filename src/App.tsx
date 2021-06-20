import React from 'react';
import { Route } from 'react-router';
import './App.scss';
import { RouterPath } from './core/enums/router-path';
import { Auth } from './pages/auth/Auth';

function App() {
  return (
    <div className="App">
      <Route path={RouterPath.LOGIN}><Auth /></Route>
      <Route path={RouterPath.REGISTER}><Auth /></Route>
    </div>
  );
}

export default App;
