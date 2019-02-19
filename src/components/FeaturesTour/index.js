import { compose, withProps } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import FeaturesTour from './FeaturesTour';

const steps = {
	mainTimeline: [
		{
			title: 'Welcome!',
			content: 'This is Hidden Perspectives.',
		},
		{
			title: 'Main timeline',
			selector: '.tour-main-timeline',
			content: 'This is the main timeline. On this area, contents of the Hidden Perspectives archive are displayed in chornology from top to bottom (oldest first)',
		},
		{
			title: 'Contents',
			selector: '.timeline-month-May-1993',
			content: 'Contents of the main timeline consist of documents, placed on the left hand side of the timeline, and of events, placed on the right hand side of the timeline.',
		},
		{
			title: 'Documents',
			selector: '.timeline-event[data-id="uir003004"]',
			content: 'This is a Document for instance. They contain information relevant to the US-Iran political relationship.',
		},
		{
			title: 'Documents',
			selector: '.timeline-event[data-id="3-12"]',
			content: 'And this is how an Event looks like.',
		},
		{
			title: 'Minimap',
			selector: '.tour-minimap',
			content: 'This is the minimap. It allows you to quickly jump into a specific year and/or to get a sense of the density of content for each year.',
		},
		{
			title: 'Protagonists',
			selector: '.tour-protagonists',
			content: 'This are the protagonists involved in the visible contents of the main timeline. You can hover them to see what contents are related with each of them.',
		},
		{
			title: 'Hovering & pinning',
			selector: '.protagonist-8cca25bd0a19999a594d',
			content: 'Hovering on an element highlights other elements relating to it. If you want to preserve a group of highlighted elements visible, click on an element.',
		},
	],
};

export default compose(
	withTheme,
	withRouter,
	withProps(({ theme, page }) => ({
		accentColor: theme.primary,
		borderColor: theme.gray200,
		steps: steps[page] || [],
	})),
)(FeaturesTour);
