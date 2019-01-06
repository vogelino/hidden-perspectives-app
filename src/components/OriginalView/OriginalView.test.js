import React from 'react';
import { shallow } from 'enzyme';
import OriginalView from '.';

describe('OriginalView', () => {
	const originalView = shallow(<OriginalView />);

	it('should render without crashing', () => {
		expect(originalView.exists()).toBe(true);
	});
});

