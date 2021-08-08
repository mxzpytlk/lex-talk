import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { RouterPath } from '../core/enums/router-path';
import { routes } from './routes';

export function AppRouter(): JSX.Element {
	return (
		<Switch>
			{routes.map(({ path, Component }) => (
				<Route path={path} component={Component} exact key={path} />
			))}
			<Redirect to={RouterPath.CHAT} />
		</Switch>
	);
}
