import classes from './navigation-link.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { INavigationLink } from '../../core/data/navigation-link';
import { Link } from 'react-router-dom';

type NavigationLinkProps = {
	link: INavigationLink,
};

export function NavigationLink(props: NavigationLinkProps): JSX.Element {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isActive = () =>
    pathname === props.link.path || props.link.possiblePathes?.some((path) => path === pathname);

  return (
    <Link
      to={props.link.path}
      className={classNames(classes.link, isActive() ? classes.link__active : classes['link__not-active'])}
    >
      {t(props.link.text)}
      <FontAwesomeIcon icon={props.link.icon} className={classes.link__icon} />
      <div className={classes.link__border}></div>
    </Link>
  );
}
