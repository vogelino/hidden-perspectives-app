import React from 'react';
import { shallow } from 'enzyme';
import Minimap from './Minimap';

describe('Minimap component', () => {
	const timeline = shallow(<Minimap />);

	it('should render without crashing', () => {
		expect(timeline.exists()).toBe(true);
	});
});
