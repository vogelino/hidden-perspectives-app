import Auth0Lock from 'auth0-lock';
import gql from 'graphql-tag';

const AUTHENTICATE = gql`
	mutation signinUser($idToken: String!) {
		signinUser(
			auth0: {
				idToken: $idToken
			}
		) {
			user {
				id
			}
		}
	}
`;

const isAuthenticated = () => {
	const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
	return new Date().getTime() < expiresAt;
};

const logout = () => {
	localStorage.removeItem('access_token');
	localStorage.removeItem('id_token');
	localStorage.removeItem('expires_at');

	window.location.reload();
};

class Auth {
	constructor(cb, apolloClient) {
		this.lock = new Auth0Lock(
			process.env.REACT_APP_CLIENT_ID,
			process.env.REACT_APP_CLIENT_DOMAIN,
			{
				oidcConformant: false,
				autoclose: true,
				auth: {
					sso: false,
					redirectUrl: process.env.REACT_APP_REDIRECT,
					responseType: 'token id_token',
					audience: process.env.REACT_APP_AUDIENCE,
					params: {
						scope: process.env.REACT_APP_SCOPE,
					},
				},
			},
		);

		this.apolloClient = apolloClient;
		this.cb = cb.bind(this);
		this.login = () => this.lock.show();
		this.logout = logout;
		this.isAuthenticated = isAuthenticated;

		this.handleAuthentication();
	}

	handleAuthentication() {
		this.lock.on('authenticated', this.setSession.bind(this));
		this.lock.on('authorization_error', (err) => {
			console.log(err); // eslint-disable-line no-console
			const data = { status: 'error', errMessage: err.error };
			this.cb(data);
		});
	}

	setSession(authResult) {
		if (authResult && authResult.accessToken && authResult.idToken) {
			// Set the time that the access token will expire at
			const expiresAt = JSON.stringify(
				authResult.expiresIn * 1000 + new Date().getTime(),
			);
			localStorage.setItem('access_token', authResult.accessToken);
			localStorage.setItem('id_token', authResult.idToken);
			localStorage.setItem('expires_at', expiresAt);
			const data = {
				status: 'success',
				accessToken: authResult.accessToken,
				idToken: authResult.idToken,
				expiresAt,
			};
			this.signinOrCreateAccount({ ...data });
			this.cb(data);
		}
	}

	signinOrCreateAccount({ idToken }) {
		this.apolloClient
			.mutate({
				mutation: AUTHENTICATE,
				variables: { idToken },
			})
			.then(() => {
				if (window.location.href.includes('callback')) {
					window.location.href = '/';
				} else {
					window.location.reload();
				}
			}).catch((err) => console.log('Sign in or create account error: ', err)); // eslint-disable-line no-console
	}
}

export default Auth;
