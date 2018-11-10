import React from 'react';
import { shallow } from 'enzyme';
import MainTimeline from '.';

describe('MainTimeline component', () => {
	const timeline = shallow(<MainTimeline />);

	it('should render without crashing', () => {
		expect(timeline.exists()).toBe(true);
	});
});
