import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { compose, withHandlers, withState } from 'recompose';
import OriginalInputWrapper from '../components/_library/InputWrapper';
import { StoryWrapper } from './styles';

const InputWrapperWithState = compose(
	withState('value', 'onInputChange', ({ value }) => value || ''),
	withHandlers({
		onChange: ({ onInputChange }) => (evt) => {
			action('Input value changed:')(evt.target.value);
			onInputChange(evt.target.value);
		},
	}),
)(OriginalInputWrapper);

const InputWrapper = (props) => (
	<StoryWrapper>
		<InputWrapperWithState {...props} />
	</StoryWrapper>
);
InputWrapper.propTypes = OriginalInputWrapper.propTypes;

const required = {
	name: 'storybook-input',
	label: 'First name',
	labelArticle: 'your',
	onChange: () => {},
};

storiesOf('Text input field', module)
	.add('Empty field', () => (
		<InputWrapper {...required} />
	))
	.add('Filled by default', () => (
		<InputWrapper {...required} value="Sponge Bob" />
	))
	.add('With description', () => (
		<InputWrapper
			{...required}
			description="Please don't use numbers"
		/>
	))
	.add('Invalid', () => (
		<InputWrapper
			{...required}
			error="This field is required"
		/>
	))
	.add('Invalid with description', () => (
		<InputWrapper
			{...required}
			description="Please don't use numbers"
			error="This field is required"
		/>
	))
	.add('Disabled', () => (
		<InputWrapper
			{...required}
			disabled
		/>
	))
	.add('Password', () => (
		<InputWrapper
			{...required}
			type="password"
			label="Password"
		/>
	))
	.add('Number', () => (
		<InputWrapper
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
		<InputWrapper
			{...required}
			optional
		/>
	))
	.add('No label', () => (
		<InputWrapper
			{...required}
			nolabel
		/>
	));

