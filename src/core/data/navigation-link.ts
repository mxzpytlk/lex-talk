import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { RouterPath } from '../enums/router-path';

export interface INavigationLink {
  needAuth: boolean;
  text: string;
  path: RouterPath | string;
  icon: IconProp
  possiblePathes?: RouterPath[];
}

export const links: INavigationLink[] = [
	{
		needAuth: false,
		text: 'auth.log_in',
		path: RouterPath.LOGIN,
		icon: ['fas', 'sign-in-alt'],
		possiblePathes: [RouterPath.DEFAULT, RouterPath.NOTHING, RouterPath.LOGIN]
	},
	{
		needAuth: false,
		text: 'auth.register',
		path: RouterPath.REGISTER,
		icon: ['fas', 'user-plus'],
	},
	{
		needAuth: true,
		text: 'common.chat',
		path: RouterPath.CHAT,
		icon: ['fas', 'comment-alt'],
	},
	{
		needAuth: true,
		text: 'common.settings',
		path: RouterPath.SETTINGS,
		icon: ['fas', 'cog'],
	},
	{
		needAuth: true,
		text: 'auth.log_out',
		path: '/logout',
		icon: ['fas', 'sign-out-alt'],
	},
];