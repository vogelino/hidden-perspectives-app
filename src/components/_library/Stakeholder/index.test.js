import React from 'react';
import { shallow } from 'enzyme';
import Stakeholder from './Stakeholder';

describe('Stakeholder component', () => {
	const stakeholder = shallow(<Stakeholder altText="CD">Stakeholder!</Stakeholder>);

	it('should render without crashing', () => {
		expect(stakeholder.exists()).toBe(true);
	});
});
