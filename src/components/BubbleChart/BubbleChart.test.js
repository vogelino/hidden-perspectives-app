import React from 'react';
import { shallow } from 'enzyme';
import BubbleChart from './BubbleChart';

describe('BubbleChart component', () => {
	const bubbleChart = shallow(<BubbleChart />);

	it('should render without crashing', () => {
		expect(bubbleChart.exists()).toBe(true);
	});
});
