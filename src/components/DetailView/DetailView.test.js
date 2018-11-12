import React from 'react';
import { shallow } from 'enzyme';
import DetailView from './DetailView';

describe('DetailView component', () => {
	const timeline = shallow(<DetailView />);

	it('should render without crashing', () => {
		expect(timeline.exists()).toBe(true);
	});
});
