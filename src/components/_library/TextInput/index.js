import React from 'react';
import PropTypes from 'prop-types';
import { Input, TextArea } from './styles';

const TextInput = ({ multiline, ...rest }) => (
	<Input as={multiline ? TextArea : Input} {...rest} />
);

TextInput.propTypes = {
	multiline: PropTypes.bool,
};

TextInput.defaultProps = {
	multiline: false,
};

export default TextInput;

