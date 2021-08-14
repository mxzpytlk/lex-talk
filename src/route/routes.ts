import { RouterPath } from '../core/enums/router-path';
import Chat from '../pages/chat/Chat';
import Settings from '../pages/settings/Settings';
import Dialog from '../pages/dialog/Dialog';

interface IRoute {
	path: RouterPath;
	Component: (() => JSX.Element) & { displayName: string };
}

export const appRoutes: IRoute[] = [
  {
    path: RouterPath.CHAT,
    Component: Chat,
  },
  {
    path: RouterPath.SETTINGS,
    Component: Settings,
  },
];

export const chatRoutes: IRoute[] = [
  {
    path: RouterPath.DIALOG,
    Component: Dialog,
  },
];
