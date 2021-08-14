import { Route, Switch, Redirect } from 'react-router-dom';
import { RouterPath } from '../core/enums/router-path';
import { appRoutes } from './routes';

export function AppRouter(): JSX.Element {
  return (
    <Switch>
      {appRoutes.map(({ path, Component }) => (
        <Route path={path} component={Component} exact key={path} />
      ))}
      <Redirect to={RouterPath.CHAT_REDIRECT} />
    </Switch>
  );
}
