import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from './Tooltip';

describe('Tooltip component', () => {
	const tooltip = shallow(<Tooltip />);

	it('should render without crashing', () => {
		expect(tooltip.exists()).toBe(true);
	});
});
