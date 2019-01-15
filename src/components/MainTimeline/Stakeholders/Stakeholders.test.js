import React from 'react';
import { shallow } from 'enzyme';
import Theme from '../../Theme';
import Stakeholders from './Stakeholders';

describe('Stakeholders component', () => {
	const stakeholders = shallow(
		<Theme>
			<Stakeholders />
		</Theme>,
	);

	it('should render without crashing', () => {
		expect(stakeholders.exists()).toBe(true);
	});
});
