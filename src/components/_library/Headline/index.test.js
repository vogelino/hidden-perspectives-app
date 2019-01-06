import React from 'react';
import { shallow } from 'enzyme';
import Headline from '.';

describe('Headline component', () => {
	const headline = shallow(<Headline variant="h1" />);

	it('should render without crashing', () => {
		expect(headline.exists()).toBe(true);
	});
});
