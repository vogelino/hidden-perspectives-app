import React from 'react';
import {
	withProps,
	withState,
	compose,
	withHandlers,
} from 'recompose';
import gql from 'graphql-tag';
import { Mutation, withApollo } from 'react-apollo';
import Login from '../../components/Login';
import { logUserIn, logUserOut } from '../../utils/localStorageUtil';

const SIGNUP_MUTATION = gql`
mutation CreateUser($userName: String!, $authProviderData: AuthProviderSignupData!) {
  createUser(
    userName: $userName
    authProvider: $authProviderData
  ) {
    id
  }
}
`;

const LOGIN_MUTATION = gql`
mutation SigninUser($email: AUTH_PROVIDER_EMAIL!) {
  signinUser(
    email: $email
  ) {
    token
    user {
      id
	  role
    }
  }
}
`;

const getLoginCallback = (props) => ({
	data: { signinUser: { token, user: { id, role } } },
	errors,
}) => {
	if (errors) {
		logUserOut();
		props.setErrors(errors);
	}
	logUserIn(token, id, role);
	props.clearFields();
};

const getLoginVariables = (props) => ({
	email: {
		email: props.emailValue,
		password: props.passwordValue,
	},
});

const getSignupVariables = (props) => (({
	userName: props.nameValue,
	authProviderData: {
		email: {
			email: props.emailValue,
			password: props.passwordValue,
		},
	},
}));

const getLoginMutation = (props) => ({
	mutation: LOGIN_MUTATION,
	variables: getLoginVariables(props),
});

export default compose(
	withApollo,
	withState('nameValue', 'onNameChange', ''),
	withState('emailValue', 'onEmailChange', ''),
	withState('passwordValue', 'onPasswordChange', ''),
	withState('login', 'onLoginMethodChange', true),
	withState('errors', 'setErrors', []),
	withProps(({
		history,
		onNameChange,
		onEmailChange,
		onPasswordChange,
	}) => ({
		namePlaceholder: 'Enter your username',
		emailPlaceholder: 'Enter your email address',
		passwordPlaceholder: 'Enter your password',
		loginTitle: 'Login into Hacker News Clone',
		signupTitle: 'Sign up into Hacker News Clone',
		loginButtonText: 'Login',
		signupButtonText: 'Sign up',
		callToLoginText: 'Already have an account?',
		callToSignupText: 'Not yet an account?',
		clearFields() {
			onNameChange('');
			onEmailChange('');
			onPasswordChange('');
			history.push('/');
		},
	})),
	withHandlers({
		onError(props) {
			return async function onErrorAsync(err) {
				props.setErrors(err.graphQLErrors);
			};
		},
		onCompleted(props) {
			return async function onCompletedAsync(data) {
				if (Object.prototype.hasOwnProperty.call(data, 'createUser')) {
					props.client.mutate(getLoginMutation(props))
						.then(getLoginCallback(props));
					return;
				}
				logUserIn(
					data.signinUser.token,
					data.signinUser.user.id,
					data.signinUser.user.role,
				);
				props.clearFields();
			};
		},
	}),
)((props) => (
	<Mutation
		mutation={props.login ? LOGIN_MUTATION : SIGNUP_MUTATION}
		variables={props.login ? getLoginVariables(props) : getSignupVariables(props)}
		onCompleted={props.onCompleted}
		onError={props.onError}
	>
		{(mutation) => <Login {...props} onSubmit={mutation} />}
	</Mutation>
));
