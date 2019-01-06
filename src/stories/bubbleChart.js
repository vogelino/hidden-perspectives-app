import React from 'react';
import { storiesOf } from '@storybook/react';
import BubbleChart from '../components/BubbleChart';
import { StoryWrapper } from './styles';

const testDataSingle = {
	itemKey: [
		{
			id: '123',
			stakeholderFullName: 'Item 1',
		},
	],
};

const testDataMultiple = {
	firstItemKey: [
		{
			id: '123',
			stakeholderFullName: 'Item 1',
		},
	],
	secondItemKey: [
		{
			id: '234',
			stakeholderFullName: 'Item 2',
		},
		{
			id: '234',
			stakeholderFullName: 'Item 2',
		},
	],
	thirdItemKey: [
		{
			id: '345',
			stakeholderFullName: 'Item 3',
		},
		{
			id: '345',
			stakeholderFullName: 'Item 3',
		},
		{
			id: '345',
			stakeholderFullName: 'Item 3',
		},
	],
};

storiesOf('BubbleChart', module)
	.add('With one item', () => (
		<StoryWrapper maxWidth={380}>
			<BubbleChart
				items={testDataSingle}
				diameter={300}
				bubblesPadding={15}
			/>
		</StoryWrapper>
	))
	.add('With multiple items', () => (
		<StoryWrapper maxWidth={380}>
			<BubbleChart
				items={testDataMultiple}
				diameter={300}
				bubblesPadding={15}
			/>
		</StoryWrapper>
	))
	.add('With loading items', () => (
		<StoryWrapper maxWidth={380}>
			<BubbleChart
				isLoading
				items={testDataMultiple}
				diameter={300}
				bubblesPadding={15}
			/>
		</StoryWrapper>
	));
