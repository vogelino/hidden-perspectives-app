import React from 'react';
import { shallow } from 'enzyme';
import SummarySection from './SummarySection';

describe('SummarySection component', () => {
	const summarySection = shallow(<SummarySection />);

	it('should render without crashing', () => {
		expect(summarySection.exists()).toBe(true);
	});
});

