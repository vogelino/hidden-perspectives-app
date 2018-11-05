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
		onChange={(evt) => onChange(evt.target.value)}
		valid={valid ? undefined : false}
		value={value || 'undefined'}
		control
		multiline={undefined}
	>
		{options.map((option) => (
			<option
				key={option.value || 'undefined'}
				value={option.value || 'undefined'}
				disabled={option.disabled || !option.value}
			>
				{option.label || placeholder}
			</option>
		))}
	</Select>
);

const optionPropTypes = PropTypes.shape({
	value: PropTypes.string,
	label: PropTypes.string,
});

TextInput.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
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

