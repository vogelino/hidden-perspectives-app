import React from 'react';
import { shallow } from 'enzyme';
import Tag from './Tag';

describe('Tag component', () => {
	const tag = shallow(<Tag>Tag!</Tag>);

	it('should render without crashing', () => {
		expect(tag.exists()).toBe(true);
	});
});
