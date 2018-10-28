import React from 'react';
import PropTypes from 'prop-types';

const Login = ({
	errors,
	login,
	onNameChange,
	nameValue,
	namePlaceholder,
	onEmailChange,
	emailValue,
	emailPlaceholder,
	onPasswordChange,
	passwordValue,
	passwordPlaceholder,
	loginButtonText,
	signupButtonText,
	onSubmit,
	onLoginMethodChange,
	callToLoginText,
	callToSignupText,
	loginTitle,
	signupTitle,
}) => (
	<form
		onSubmit={(evt) => {
			evt.preventDefault();
			onSubmit();
		}}
	>
		<h4 className="mv3">{login ? loginTitle : signupTitle}</h4>
		<div className="flex flex-column">
			{!login && (
				<input
					value={nameValue}
					onChange={(e) => onNameChange(e.target.value)}
					type="text"
					autoComplete="username"
					placeholder={namePlaceholder}
				/>
			)}
			<input
				value={emailValue}
				onChange={(e) => onEmailChange(e.target.value)}
				type="email"
				autoComplete="email"
				placeholder={emailPlaceholder}
			/>
			<input
				value={passwordValue}
				onChange={(e) => onPasswordChange(e.target.value)}
				type="password"
				autoComplete={login ? 'current-password' : 'new-password'}
				placeholder={passwordPlaceholder}
			/>
		</div>
		<div className="flex mt3">
			<input type="submit" className="pointer mr2 button" value={login ? loginButtonText : signupButtonText} />
			<button type="button" className="pointer button" onClick={() => onLoginMethodChange(!login)}>
				{login ? callToSignupText : callToLoginText}
			</button>
		</div>
		<div>
			{errors.map(({ message }) => (
				<h1>{message}</h1>
			))}
		</div>
	</form>
);

Login.defaultProps = {
	nameValue: '',
	emailValue: '',
	passwordValue: '',
	errors: [],
};

Login.propTypes = {
	errors: PropTypes.arrayOf(PropTypes.shape({
		message: PropTypes.string.isRequired,
	})),
	login: PropTypes.bool.isRequired,
	onNameChange: PropTypes.func.isRequired,
	nameValue: PropTypes.string,
	namePlaceholder: PropTypes.string.isRequired,
	onEmailChange: PropTypes.func.isRequired,
	emailValue: PropTypes.string,
	emailPlaceholder: PropTypes.string.isRequired,
	onPasswordChange: PropTypes.func.isRequired,
	passwordValue: PropTypes.string,
	passwordPlaceholder: PropTypes.string.isRequired,
	loginButtonText: PropTypes.string.isRequired,
	signupButtonText: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onLoginMethodChange: PropTypes.func.isRequired,
	callToLoginText: PropTypes.string.isRequired,
	callToSignupText: PropTypes.string.isRequired,
	loginTitle: PropTypes.string.isRequired,
	signupTitle: PropTypes.string.isRequired,
};

export default Login;

