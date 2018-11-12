import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '.';

describe('TextInput component', () => {
	const textInput = shallow(<TextInput />);

	it('should render without crashing', () => {
		expect(textInput.exists()).toBe(true);
	});
});

