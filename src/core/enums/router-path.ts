export enum RouterPath {
	NOTHING = '*',
	DEFAULT = '/',
	LOGIN = '/login',
	REGISTER = '/register',
	LOGOUT = '/logout',
	CHAT = '/chat*',
  CHAT_REDIRECT = '/chat',
	SETTINGS = '/settings',
  DIALOG = '/chat/dialog/:id'
}
