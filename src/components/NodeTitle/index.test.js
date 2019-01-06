import React from 'react';
import { shallow } from 'enzyme';
import NodeTitle from './NodeTitle';

describe('NodeTitle component', () => {
	const fieldset = shallow(
		<NodeTitle
			title="Yo what's up?"
			subtitle="Hey!"
		/>,
	);

	it('should render without crashing', () => {
		expect(fieldset.exists()).toBe(true);
	});
});
