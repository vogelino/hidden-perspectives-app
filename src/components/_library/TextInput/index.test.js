import React from 'react';
import { shallow, mount } from 'enzyme';
import {
	FormGroup,
} from '@smooth-ui/core-sc';
import {
	Description,
	Label,
	Input,
	ControlFeedback,
} from './styles';
import TextInput from '.';

const onInputChange = jest.fn();
const requiredProps = {
	onChange: onInputChange,
	name: 'test-input',
	label: 'Test',
	valid: true,
	placeholder: 'Type something',
};

describe('TextInput component', () => {
	const wrapper = mount(
		<TextInput
			{...requiredProps}
			description="This is the description"
		/>,
	);

	describe('<FormGroup />', () => {
		const formGroupElement = wrapper.find(FormGroup);

		it('should contain a FormGroup element', () => {
			expect(formGroupElement).toHaveLength(1);
		});
	});

	const inputElement = wrapper.find(Input);
	const getInputAttr = (attrName) => inputElement.getElement().props[attrName];

	describe('<Input />', () => {
		it('should contain an Input element', () => {
			expect(inputElement).toHaveLength(1);
		});

		it('should have an onChangeHandler', () => {
			expect(typeof inputElement.prop('onChange')).toBe('function');
		});

		it('should have a value attribute', () => {
			expect(getInputAttr('value')).toBeDefined();
		});

		it('should have a name attribute', () => {
			expect(getInputAttr('name')).toBeDefined();
		});

		it('should have a placeholder attribute', () => {
			expect(getInputAttr('placeholder')).toBeDefined();
		});

		it('should have a type attribute', () => {
			expect(getInputAttr('type')).toBeDefined();
		});

		it('should have an aria-labelledby attribute', () => {
			expect(getInputAttr('aria-labelledby')).toBe('test-input-label');
		});
	});

	const labelElement = wrapper.find(Label);
	const getLabelAttr = (attrName) => labelElement.getElement().props[attrName];

	describe('<Label />', () => {
		it('should contain a Label element', () => {
			expect(labelElement).toHaveLength(1);
		});

		it('should have a htmlFor attribute', () => {
			expect(getLabelAttr('htmlFor')).toBeDefined();
		});

		it('should have an id attribute combined with the name', () => {
			expect(getLabelAttr('id')).toBe('test-input-label');
		});

		it('the htmlFor attribute should equal the text input\'s name attribute', () => {
			expect(getLabelAttr('htmlFor')).toBe(getInputAttr('name'));
		});
	});

	describe('<ControlFeedback />', () => {
		it('should contain a ControlFeedback element if an error is provided', () => {
			const localWrapper = shallow(<TextInput {...requiredProps} error=":(" />);
			const feedbackElement = localWrapper.find(ControlFeedback);

			expect(feedbackElement).toHaveLength(1);
		});

		it('shouldn\'t contain a ControlFeedback element if no error is provided', () => {
			const localWrapper = shallow(<TextInput {...requiredProps} />);
			const feedbackElement = localWrapper.find(ControlFeedback);

			expect(feedbackElement).toHaveLength(0);
		});
	});

	describe('<Description />', () => {
		it('should exist if the Description props is given', () => {
			const localWrapper = shallow(
				<TextInput
					{...requiredProps}
					description="This does that"
				/>,
			);
			const descriptionElement = localWrapper.find(Description);

			expect(descriptionElement).toHaveLength(1);
		});

		it('should\'t exist if the description props isn\'t given', () => {
			const localWrapper = shallow(<TextInput {...requiredProps} />);
			const descriptionElement = localWrapper.find(Description);

			expect(descriptionElement).toHaveLength(0);
		});
	});
});

