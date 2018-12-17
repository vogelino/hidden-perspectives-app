import React from 'react';
import { shallow } from 'enzyme';
import CircleTimeline from '.';

describe('CircleTimeline', () => {
	const circleTimeline = shallow(<CircleTimeline />);

	it('should render without crashing', () => {
		expect(circleTimeline.exists()).toBe(true);
	});
});

