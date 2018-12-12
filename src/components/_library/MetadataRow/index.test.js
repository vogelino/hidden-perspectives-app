import React from 'react';
import { shallow } from 'enzyme';
import MetadataRow from './MetadataRow';

describe('MetadataRow component', () => {
	const metadataRow = shallow(<MetadataRow label="This is a label">Hey!</MetadataRow>);

	it('should render without crashing', () => {
		expect(metadataRow.exists()).toBe(true);
	});
});
