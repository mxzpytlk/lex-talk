import './navigation-link.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { INavigationLink } from '../../core/data/navigation-link';

type NavigationLinkProps = {
	link: INavigationLink,
};

export function NavigationLink(props: NavigationLinkProps): JSX.Element {
	const { t } = useTranslation();
	const { pathname } = useLocation();

	const isActive = () =>
		pathname === props.link.path || props.link.possiblePathes?.some((path) => path === pathname);

	return (
		<a
			href={props.link.path}
			className={classNames('link', isActive() ? 'link__active' : 'link__not-active')}
		>
			{t(props.link.text)}
			<FontAwesomeIcon icon={props.link.icon} className="link__icon" />
			<div className="link__border"></div>
		</a>
	);
}
