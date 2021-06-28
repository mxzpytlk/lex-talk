import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fontawesome';
import './i18n';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Store } from './store/store';
import {} from 'apollo-boost';

const history = createBrowserHistory();
const store = new Store();

interface IStore {
	store: Store;
}

var firebaseConfig = {
  apiKey: 'AIzaSyCn8F22geVz0MX1bTvOr1FUakG-_OiYJcc',
  authDomain: 'lex-talk.firebaseapp.com',
  projectId: 'lex-talk',
  storageBucket: 'lex-talk.appspot.com',
  messagingSenderId: '1072157726674',
  appId: '1:1072157726674:web:162760a8d590167e515a0b',
  measurementId: 'G-KXEF49M0R6'
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

export const Context = createContext<IStore>({
	store,
});

ReactDOM.render(
	<React.StrictMode>
		<Context.Provider
			value={{
				store,
			}}
		>
			<Router history={history}>
				<App />
			</Router>
		</Context.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
