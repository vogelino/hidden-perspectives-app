import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { compose, withHandlers, withState } from 'recompose';
import OriginalTextInput from '../components/_library/TextInput';
import { StoryWrapper } from './styles';

const TextInputWithState = compose(
	withState('value', 'onInputChange', ({ value }) => value || ''),
	withHandlers({
		onChange: ({ onInputChange }) => (evt) => {
			action('Input value changed:')(evt.target.value);
			onInputChange(evt.target.value);
		},
	}),
)(OriginalTextInput);

const TextInput = (props) => (
	<StoryWrapper>
		<TextInputWithState {...props} />
	</StoryWrapper>
);
TextInput.propTypes = OriginalTextInput.propTypes;

const required = {
	name: 'storybook-input',
	label: 'First name',
	labelArticle: 'your',
	onChange: () => {},
};

storiesOf('Text input field', module)
	.add('Empty field', () => (
		<TextInput {...required} />
	))
	.add('Filled by default', () => (
		<TextInput {...required} value="Sponge Bob" />
	))
	.add('With description', () => (
		<TextInput
			{...required}
			description="Please don't use numbers"
		/>
	))
	.add('Invalid', () => (
		<TextInput
			{...required}
			error="This field is required"
		/>
	))
	.add('Invalid with description', () => (
		<TextInput
			{...required}
			description="Please don't use numbers"
			error="This field is required"
		/>
	))
	.add('Disabled', () => (
		<TextInput
			{...required}
			disabled
		/>
	))
	.add('Password', () => (
		<TextInput
			{...required}
			type="password"
			label="Password"
		/>
	))
	.add('Number', () => (
		<TextInput
			{...required}
			description="Access is denied to minors under 18 years of age"
			label="Age"
			type="number"
			min={18}
			value={18}
			width={80}
		/>
	))
	.add('Optional', () => (
		<TextInput
			{...required}
			optional
		/>
	))
	.add('No label', () => (
		<TextInput
			{...required}
			nolabel
		/>
	));

