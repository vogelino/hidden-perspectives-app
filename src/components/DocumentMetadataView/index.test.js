import React from 'react';
import { shallow } from 'enzyme';
import DocumentMetadataView from '.';

describe('DocumentMetadataView component', () => {
	const documentMetadataView = shallow(<DocumentMetadataView />);

	it('should render without crashing', () => {
		expect(documentMetadataView.exists()).toBe(true);
	});
});
