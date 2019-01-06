import React from 'react';
import { shallow } from 'enzyme';
import NodeHeader from './NodeHeader';

describe('NodeHeader component', () => {
	const fieldset = shallow(
		<NodeHeader />,
	);

	it('should render without crashing', () => {
		expect(fieldset.exists()).toBe(true);
	});
});
