import { Route, Switch } from 'react-router-dom';
import { chatRoutes } from './routes';

export function ChatRouter(): JSX.Element {
  return (
    <Switch>
      {chatRoutes.map(({ path, Component }) => (
        <Route path={path} component={Component} exact key={path} />
      ))}
    </Switch>
  );
}
