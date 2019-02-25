import React from 'react';
import PropTypes from 'prop-types';
import {
	Title,
	Container,
	CloseButton,
	ErrorEl,
} from './styles';

const getErrorTitle = (errors) => {
	if (errors.length === 1) return 'An unexpected error has occurred';
	return `${errors.length} unexpected errors have occurred`;
};

const Errors = ({ errors, isOpened, onClose }) => (errors.length > 0 && isOpened ? (
	<Container>
		<CloseButton onClick={onClose}>✕</CloseButton>
		<Title variant="h5">{getErrorTitle(errors)}</Title>
		{console.log(errors)}
		{errors.map((error) => (
			<ErrorEl key={error}>
				{error.split('\n').map((errorLine) => (
					<p key={errorLine}>{errorLine}</p>
				))}
			</ErrorEl>
		))}
	</Container>
) : null);

Errors.propTypes = {
	errors: PropTypes.arrayOf(PropTypes.string),
	isOpened: PropTypes.bool,
	onClose: PropTypes.func,
};

Errors.defaultProps = {
	errors: [],
	isOpened: true,
	onClose: () => {},
};

export default Errors;
