import { Route, Switch, Redirect } from 'react-router-dom';
import { RouterPath } from '../core/enums/router-path';
import { routes } from './routes';

export function AppRouter() {
	return (
		<Switch>
			{routes.map(({ path, Component }) => (
				<Route path={path} component={Component} exact />
			))}
			<Redirect to={RouterPath.CHAT} />
		</Switch>
	);
}
