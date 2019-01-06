import React from 'react';
import { shallow } from 'enzyme';
import MetadataView from '.';

describe('DocumentMetadataView component', () => {
	const metadataView = shallow(<MetadataView />);

	it('should render without crashing', () => {
		expect(metadataView.exists()).toBe(true);
	});
});
