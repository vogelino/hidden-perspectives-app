import React from 'react';
import PropTypes from 'prop-types';
import {
	FormGroup,
} from '@smooth-ui/core-sc';
import {
	Description,
	Label,
	Input,
	ControlFeedback,
	OptionalText,
} from './styles';

const TextInput = ({
	value,
	name,
	type,
	label,
	error,
	optional,
	onChange,
	placeholder,
	description,
	labelArticle,
	...rest
}) => (
	<FormGroup>
		<Label
			htmlFor={name}
			tabIndex="-1"
			id={`${name}-label`}
		>
			{label}
			{optional && <OptionalText>(optional)</OptionalText>}
		</Label>
		<Input
			type={type}
			name={name}
			id={name}
			value={value}
			placeholder={placeholder || `Enter ${labelArticle} ${label.toLowerCase()}`}
			onChange={onChange}
			aria-labelledby={`${name}-label`}
			valid={!error}
			{...rest}
		/>
		{description && (
			<Description id={`${name}-description`}>
				{description}
			</Description>
		)}
		{error && <ControlFeedback valid={false}>{error}</ControlFeedback>}
	</FormGroup>
);

TextInput.propTypes = {
	value: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	error: PropTypes.string,
	optional: PropTypes.bool,
	placeholder: PropTypes.string,
	description: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	labelArticle: PropTypes.string,
};

TextInput.defaultProps = {
	value: '',
	error: '',
	type: 'text',
	description: '',
	placeholder: undefined,
	labelArticle: 'the',
	optional: false,
};

export default TextInput;

