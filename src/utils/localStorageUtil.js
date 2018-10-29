import { USER_ROLE, USER_ID, AUTH_TOKEN } from '../state/constants';

export const getUserRole = () => localStorage.getItem(USER_ROLE);
export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN);
export const getUserId = () => localStorage.getItem(USER_ID);

export const isAuthenticated = () => Boolean(
	getUserId() && getUserRole() && getAuthToken(),
);

export const isAuthorized = (authorizedRoles = ['Viewer', 'Editor', 'Admin']) => authorizedRoles
	.some((role) => role === getUserRole());

export const logUserOut = () => {
	localStorage.removeItem(AUTH_TOKEN);
	localStorage.removeItem(USER_ROLE);
	localStorage.removeItem(USER_ID);
};

export const logUserIn = (token, id, role) => {
	localStorage.setItem(AUTH_TOKEN, token);
	localStorage.setItem(USER_ID, id);
	localStorage.setItem(USER_ROLE, role);
};


