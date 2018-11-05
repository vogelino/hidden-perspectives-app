import React from 'react';
import { mount } from 'enzyme';
import TextInput from '../TextInput';
import {
	FormGroup,
	Description,
	Label,
	ControlFeedback,
} from './styles';
import Theme from '../../Theme';
import InputWrapper from '.';

const onInputChange = jest.fn();
const requiredProps = {
	onChange: onInputChange,
	name: 'test-input',
	label: 'Test',
	valid: true,
	placeholder: 'Type something',
	value: 'lalala',
};

describe('InputWrapper component', () => {
	const wrapper = mount(
		<Theme>
			<InputWrapper
				{...requiredProps}
				description="This is the description"
			/>
		</Theme>,
	);

	describe('<FormGroup />', () => {
		const formGroupElement = wrapper.find(FormGroup);

		it('should contain a FormGroup element', () => {
			expect(formGroupElement).toHaveLength(1);
		});
	});

	const inputElement = wrapper.find(TextInput);

	describe('<Input />', () => {
		it('should contain an Input element', () => {
			expect(inputElement).toHaveLength(1);
		});

		it('should have an onChangeHandler', () => {
			expect(typeof inputElement.prop('onChange')).toBe('function');
		});

		it('should have a value prop', () => {
			expect(inputElement.prop('value')).toBeDefined();
		});

		it('should have a name prop', () => {
			expect(inputElement.prop('name')).toBeDefined();
		});

		it('should have a placeholder prop', () => {
			expect(inputElement.prop('placeholder')).toBeDefined();
		});

		it('should have a type prop', () => {
			expect(inputElement.prop('type')).toBeDefined();
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
			expect(getLabelAttr('htmlFor')).toBe(inputElement.prop('name'));
		});
	});

	describe('<ControlFeedback />', () => {
		it('should contain a ControlFeedback element if an error is provided', () => {
			const localWrapper = mount(
				<Theme>
					<InputWrapper {...requiredProps} error=":(" />
				</Theme>,
			);
			const feedbackElement = localWrapper.find(ControlFeedback);

			expect(feedbackElement).toHaveLength(1);
		});

		it('shouldn\'t contain a ControlFeedback element if no error is provided', () => {
			const localWrapper = mount(
				<Theme>
					<InputWrapper {...requiredProps} />
				</Theme>,
			);
			const feedbackElement = localWrapper.find(ControlFeedback);

			expect(feedbackElement).toHaveLength(0);
		});
	});

	describe('<Description />', () => {
		it('should exist if the Description props is given', () => {
			const localWrapper = mount(
				<Theme>
					<InputWrapper
						{...requiredProps}
						description="This does that"
					/>
				</Theme>,
			);
			const descriptionElement = localWrapper.find(Description);

			expect(descriptionElement).toHaveLength(1);
		});

		it('should\'t exist if the description props isn\'t given', () => {
			const localWrapper = mount(<InputWrapper {...requiredProps} />);
			const descriptionElement = localWrapper.find(Description);

			expect(descriptionElement).toHaveLength(0);
		});
	});
});

