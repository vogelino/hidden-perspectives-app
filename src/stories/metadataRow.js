import React from 'react';
import { storiesOf } from '@storybook/react';
import MetadataRow from '../components/_library/MetadataRow';
import TextInput from '../components/_library/TextInput';
import { StoryWrapper } from './styles';

storiesOf('MetadataRow', module)
	.add('With string as children', () => (
		<StoryWrapper maxWidth={640}>
			<MetadataRow label="This is a label">
				{'And I am a meta info'}
			</MetadataRow>
			<MetadataRow label="This is a label">
				{'And I am a meta info'}
			</MetadataRow>
			<MetadataRow label="This is a label">
				{'And I am a meta info'}
			</MetadataRow>
		</StoryWrapper>
	))
	.add('With component as children', () => (
		<StoryWrapper maxWidth={640}>
			<MetadataRow label="This is a MetadataRow">
				<TextInput />
			</MetadataRow>
		</StoryWrapper>
	));
