import React from 'react';
import { shallow } from 'enzyme';
import Theme from '../../Theme';
import Protagonists from './Protagonists';

describe('Protagonists component', () => {
	const protagonists = shallow(
		<Theme>
			<Protagonists />
		</Theme>,
	);

	it('should render without crashing', () => {
		expect(protagonists.exists()).toBe(true);
	});
});
