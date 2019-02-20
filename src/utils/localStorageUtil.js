import isDate from 'date-fns/is_date';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import { USER_ROLE, USER_ID, AUTH_TOKEN } from '../state/constants';

export const getUserRole = () => localStorage.getItem(USER_ROLE);
export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN);
export const getUserId = () => localStorage.getItem(USER_ID);

export const isAuthenticated = () => Boolean(
	lib.getUserId() // eslint-disable-line no-use-before-define
	&& lib.getUserRole() // eslint-disable-line no-use-before-define
	&& lib.getAuthToken(), // eslint-disable-line no-use-before-define
);

export const isAuthorized = (authorizedRoles = ['Viewer', 'Editor', 'Admin']) => authorizedRoles
	.some((role) => role === lib.getUserRole()); // eslint-disable-line no-use-before-define

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

const saveTour = (componentName) => {
	const date = new Date();
	localStorage.setItem(`hp-last-${componentName}-tour-visit`, date);
};

export const startTour = (componentName, callback) => {
	const date = new Date();
	const lastTourDate = localStorage.getItem(`hp-last-${componentName}-tour-visit`);
	if (!isDate(lastTourDate)) {
		localStorage.removeItem(`hp-last-${componentName}-tour-visit`);
	}
	if (lastTourDate && differenceInMinutes(lastTourDate, date) < 1) {
		return callback(false);
	}
	saveTour(componentName);
	return callback(true);
};

export const lib = {
	isAuthenticated,
	isAuthorized,
	getUserRole,
	getAuthToken,
	getUserId,
	logUserOut,
	logUserIn,
};
