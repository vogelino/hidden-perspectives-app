import React from 'react';
import { storiesOf } from '@storybook/react';
import Tag from '../components/_library/Tag';
import { StoryWrapper } from './styles';

storiesOf('Tags', module)
	.add('Display tags', () => (
		<StoryWrapper>
			<Tag>Tag 1</Tag>
			<Tag>Tag 2</Tag>
			<Tag>Tag 3</Tag>
			<Tag>Extremely long tag containing lots and lots of text!!</Tag>
			<Tag>Tag with normal length</Tag>
		</StoryWrapper>
	));
