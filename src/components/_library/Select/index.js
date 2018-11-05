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
	...rest
}) => (
	<Select
		{...rest}
		id={id}
		name={name}
		onChange={(evt) => onChange(options[evt.target.selectedIndex])}
		valid={valid ? undefined : false}
		value={value ? value.text : undefined}
		control
		multiline={undefined}
	>
		{options.map((option) => (
			<option
				key={option.name}
				name={option.name}
			>
				{option.text}
			</option>
		))}
	</Select>
);

const optionPropTypes = PropTypes.shape({
	name: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
});

TextInput.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: optionPropTypes,
	onChange: PropTypes.func,
	valid: PropTypes.bool,
	options: PropTypes.arrayOf(optionPropTypes).isRequired,
};

TextInput.defaultProps = {
	onChange: () => {},
	valid: true,
	value: undefined,
};

export default TextInput;

