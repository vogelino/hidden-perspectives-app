import React from 'react';
import { shallow } from 'enzyme';
import TimelineItems from './TimelineItems';

const items = [
	{
		key: 'woifjewoifjew',
		year: '2019',
		months: [
			{
				key: 'woiefjweiofjwwgio3',
				month: 'January',
				days: [
					{
						key: 'qwioucegh283opufq',
						day: '1',
						events: [
							{
								id: 'wpijfewoipfjwwefwef',
								title: 'Event',
								path: '/wiufwef/fbkweu/bfwe',
								date: new Date(),
							},
						],
						documents: [
							{
								id: 'wpijfewoipfjwwefwef',
								title: 'Event',
								path: '/wiufwef/fbkweu/bfwfeefwefw',
								date: new Date(),
							},
						],
					},
				],
			},
		],
	},
];

describe('TimelineItems component', () => {
	const timelineItems = shallow(<TimelineItems timelineItems={items} />);

	it('should render without crashing', () => {
		expect(timelineItems.exists()).toBe(true);
	});
});
