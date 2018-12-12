import React from 'react';
import { storiesOf } from '@storybook/react';
import Headline from '../components/_library/Headline';
import { StoryWrapper } from './styles';

storiesOf('Typography', module)
	.add('Regular headlines', () => (
		<StoryWrapper maxWidth="640">
			<Headline variant="h1">h1. Smooth heading</Headline>
			<Headline variant="h2">h2. Smooth heading</Headline>
			<Headline variant="h3">h3. Smooth heading</Headline>
			<Headline variant="h4">h4. Smooth heading</Headline>
			<Headline variant="h5">h5. Smooth heading</Headline>
			<Headline variant="h6">h6. Smooth heading</Headline>
		</StoryWrapper>
	))
	.add('Display headlines', () => (
		<StoryWrapper maxWidth="640">
			<Headline variant="display-1">Display 1</Headline>
			<Headline variant="display-2">Display 2</Headline>
			<Headline variant="display-3">Display 3</Headline>
			<Headline variant="display-4">Display 4</Headline>
		</StoryWrapper>
	));
