import React from 'react';
import { shallow } from 'enzyme';
import Select from '.';

const required = {
	id: 'test-select',
	name: 'select',
	options: [
		{ name: 'option-1', text: 'Option 1' },
	],
};

describe('Select component', () => {
	const select = shallow(<Select {...required} />);

	it('should render without crashing', () => {
		expect(select.exists()).toBe(true);
	});
});

