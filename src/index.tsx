import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fontawesome';
import './i18n';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Store } from './store/store';
import { client } from './graphql/';
import { ApolloProvider } from 'react-apollo';

const history = createBrowserHistory();
const store = new Store();

interface IStore {
	store: Store;
}

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
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Router>
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
