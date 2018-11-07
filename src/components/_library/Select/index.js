import React from 'react';
import PropTypes from 'prop-types';
import { Select } from './styles';

const TextInput = ({
	id,
	name,
	onChange,
	value,
	options,
	valid,
	placeholder,
	...rest
}) => (
	<Select
		{...rest}
		id={id}
		name={name}
		onChange={onChange}
		value={value}
		valid={valid}
		control
		multiline={undefined}
		options={options}
		placeholder={placeholder}
		isSearchable={false}
	/>
);

const optionPropTypes = PropTypes.shape({
	value: PropTypes.string,
	label: PropTypes.string,
});

TextInput.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		optionPropTypes,
	]),
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	valid: PropTypes.bool,
	options: PropTypes.arrayOf(optionPropTypes).isRequired,
};

TextInput.defaultProps = {
	onChange: () => {},
	valid: true,
	value: undefined,
	placeholder: 'Select an item',
};

export default TextInput;

