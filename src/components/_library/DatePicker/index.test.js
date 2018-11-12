import React from 'react';
import { mount } from 'enzyme';
import DatePicker from '.';
import { DayPicker } from './styles';
import TextInput from '../TextInput';

describe('DatePicker component', () => {
	const datePicker = mount(<DatePicker />);

	it('should render without crashing', () => {
		expect(datePicker.exists()).toBe(true);
	});

	it('should not render the DayPicker per default', () => {
		expect(datePicker.find(DayPicker)).toHaveLength(0);
	});

	it('should render a TextInput element', () => {
		const input = datePicker.find(TextInput);
		expect(input.exists()).toBe(true);
	});

	describe('Focus', () => {
		it('should render the DayPicker if the input is focused', () => {
			const input = datePicker.find(TextInput);
			input.simulate('focus');
			expect(datePicker.find(DayPicker)).toHaveLength(1);
		});

		it('should render the DayPicker if the input is focused', () => {
			const input = datePicker.find(TextInput);
			input.simulate('focus');
			expect(datePicker.find(DayPicker)).toHaveLength(1);
		});

		it('should remove the DayPicker when it is blurred', () => {
			const input = datePicker.find(TextInput);
			const dayPicker = datePicker.find(DayPicker);
			input.simulate('focus');
			dayPicker.simulate('blur');
			expect(dayPicker).toHaveLength(1);
		});
	});
});

