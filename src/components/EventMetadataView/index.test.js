import React from 'react';
import { shallow } from 'enzyme';
import EventMetadataView from '.';

describe('EventMetadataView component', () => {
	const eventMetadataView = shallow(<EventMetadataView />);

	it('should render without crashing', () => {
		expect(eventMetadataView.exists()).toBe(true);
	});
});
