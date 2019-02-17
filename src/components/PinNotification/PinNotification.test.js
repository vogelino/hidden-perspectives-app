import React from 'react';
import { shallow } from 'enzyme';
import PinNotification from './PinNotification';

describe('PinIndicator component', () => {
	const fieldset = shallow(
		<PinNotification />,
	);

	it('should render without crashing', () => {
		expect(fieldset.exists()).toBe(true);
	});
});
