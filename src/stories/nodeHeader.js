import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NodeHeader from '../components/NodeHeader/NodeHeader';
import { StoryWrapper } from './styles';

const tabs = [
	{ label: 'Tab 1', url: '#' },
	{ label: 'Tab 2', url: '#' },
	{ label: 'Tab 3', url: '#' },
	{ label: 'Tab 4', url: '#' },
];

storiesOf('Node header', module)
	.add('Just tabs', () => (
		<StoryWrapper maxWidth={960}>
			<Router><NodeHeader tabs={tabs} isStatic /></Router>
		</StoryWrapper>
	))
	.add('With edit button', () => (
		<StoryWrapper maxWidth={960}>
			<Router><NodeHeader tabs={tabs} editUrl="#" isStatic /></Router>
		</StoryWrapper>
	));
