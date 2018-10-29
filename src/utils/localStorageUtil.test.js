import sinon from 'sinon';
import * as lsu from './localStorageUtil';
import { AUTH_TOKEN, USER_ID, USER_ROLE } from '../state/constants';

const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

describe('getUserRole', () => {
	it('should gather the user role from the localStorage', () => {
		lsu.getUserRole();
		expect(getItemSpy).toHaveBeenCalledWith(USER_ROLE);
	});
});

describe('getUserId', () => {
	it('should gather the user id from the localStorage', () => {
		lsu.getUserId();
		expect(getItemSpy).toHaveBeenCalledWith(USER_ID);
	});
});

describe('getAuthToken', () => {
	it('should gather the auth token from the localStorage', () => {
		lsu.getAuthToken();
		expect(getItemSpy).toHaveBeenCalledWith(AUTH_TOKEN);
	});
});

describe('isAuthenticated', () => {
	beforeAll(() => {
		lsu.lib.getUserId = sinon.stub(lsu, 'getUserId');
		lsu.lib.getUserRole = sinon.stub(lsu, 'getUserRole');
		lsu.lib.getAuthToken = sinon.stub(lsu, 'getAuthToken');
	});

	afterAll(() => {
		lsu.lib.getUserId.restore();
		lsu.lib.getUserRole.restore();
		lsu.lib.getAuthToken.restore();
	});

	it('should return true if id, role and auth-token are available', () => {
		lsu.lib.getUserId.returns(true);
		lsu.lib.getUserRole.returns(true);
		lsu.lib.getAuthToken.returns(true);
		expect(lsu.isAuthenticated()).toBe(true);
	});

	it('should return false if getUserId is falsy', () => {
		lsu.lib.getUserId.returns(false);
		lsu.lib.getUserRole.returns(true);
		lsu.lib.getAuthToken.returns(true);
		expect(lsu.isAuthenticated()).toBe(false);
	});

	it('should return false if getUserRole is falsy', () => {
		lsu.lib.getUserId.returns(true);
		lsu.lib.getUserRole.returns(false);
		lsu.lib.getAuthToken.returns(true);
		expect(lsu.isAuthenticated()).toBe(false);
	});

	it('should return false if getAuthToken is falsy', () => {
		lsu.lib.getUserId.returns(true);
		lsu.lib.getUserRole.returns(true);
		lsu.lib.getAuthToken.returns(false);
		expect(lsu.isAuthenticated()).toBe(false);
	});

	it('should return a boolean and not the result of the last predicate', () => {
		lsu.lib.getUserId.returns('a');
		lsu.lib.getUserRole.returns('b');
		lsu.lib.getAuthToken.returns('c');
		const isAuthenticated = lsu.isAuthenticated();
		expect(isAuthenticated).toBe(true);
		expect(isAuthenticated).not.toBe('c');
	});
});

describe('isAuthorized', () => {
	beforeAll(() => {
		lsu.lib.getUserRole = sinon.stub(lsu, 'getUserRole');
	});

	afterAll(() => {
		lsu.lib.getUserRole.restore();
	});

	it('should default to true if no argument is passed', () => {
		lsu.lib.getUserRole.returns('Viewer');
		expect(lsu.isAuthorized(undefined)).toBe(true);
	});

	it('should return true if the current role is part of the given list', () => {
		lsu.lib.getUserRole.returns('Editor');
		expect(lsu.isAuthorized(['Editor', 'Admin'])).toBe(true);
	});

	it('should return false if the current role is not part of the given list', () => {
		lsu.lib.getUserRole.returns('Viewer');
		expect(lsu.isAuthorized(['Editor', 'Admin'])).toBe(false);
	});
});

describe('logUserOut', () => {
	it('should remove all items from the localStorage', () => {
		lsu.logUserOut();
		expect(removeItemSpy).toHaveBeenNthCalledWith(1, AUTH_TOKEN);
		expect(removeItemSpy).toHaveBeenNthCalledWith(2, USER_ROLE);
		expect(removeItemSpy).toHaveBeenNthCalledWith(3, USER_ID);
	});
});

describe('logUserIn', () => {
	it('should set all items to the localStorage', () => {
		const role = 'Viewer';
		const id = 'bob';
		const token = 'token';
		lsu.logUserIn(token, id, role);
		expect(setItemSpy).toHaveBeenNthCalledWith(1, AUTH_TOKEN, token);
		expect(setItemSpy).toHaveBeenNthCalledWith(2, USER_ID, id);
		expect(setItemSpy).toHaveBeenNthCalledWith(3, USER_ROLE, role);
	});
});

