import React from 'react';
import { shallow } from 'enzyme';
import Fieldset from './Fieldset';

describe('Fieldset component', () => {
	const fieldset = shallow(<Fieldset title="Yo what's up?">Hey!</Fieldset>);

	it('should render without crashing', () => {
		expect(fieldset.exists()).toBe(true);
	});
});
