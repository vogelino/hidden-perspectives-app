import React from 'react';
import { shallow } from 'enzyme';
import NodeTitle from './NodeTitle';

describe('NodeTitle component', () => {
	const fieldset = shallow(<NodeTitle additionalInfo="Yo what's up?">Hey!</NodeTitle>);

	it('should render without crashing', () => {
		expect(fieldset.exists()).toBe(true);
	});
});
