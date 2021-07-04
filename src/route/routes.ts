import { RouterPath } from '../core/enums/router-path';
import { Chat } from '../pages/chat/Chat';
import Settings from '../pages/settings/Settings';

export const routes = [
  {
    path: RouterPath.CHAT,
    Component: Chat
  }, 
  {
    path: RouterPath.SETTINGS,
    Component: Settings
  }
];