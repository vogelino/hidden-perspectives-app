import { compose, withProps } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import DocumentImage from './images/documents.svg';
import EventImage from './images/events.svg';
import ProtagonistImage from './images/protagonists.svg';
import MinimapImage from './images/minimap.gif';
import PinningImage from './images/hovering-and-pinning.gif';
import SearchImage from './images/search.gif';
import FeaturesTour from './FeaturesTour';

const steps = {
	mainTimeline: [
		{
			title: 'Welcome!',
			content: 'Hidden Perspective is an interactive digital archive consisting of documents and events relating to the U.S.-Iran relationship’s history since the 1978 – 1979 Iranian revolution.',
		},
		{
			title: 'Documents',
			image: DocumentImage,
			selector: '.timeline-event[data-id="uir003004"]',
			content: 'Documents are symbolized by a page icon and are placed on the left of the vertical timeline.',
		},
		{
			title: 'Events',
			image: EventImage,
			selector: '.timeline-event[data-id="3-12"]',
			content: 'Event are symbolized by a calendar icon and are placed on the right of the vertical timeline.',
		},
		{
			title: 'Protagonists',
			image: ProtagonistImage,
			selector: '.tour-protagonists',
			content: 'These are the protagonists involved in the visible documents and events.',
		},
		{
			title: 'Minimap',
			image: MinimapImage,
			selector: '.tour-minimap',
			content: 'The minimap allows you to quickly jump into a specific year and to get a sense of the content\'s density of each year.',
		},
		{
			title: 'Hovering & pinning',
			image: PinningImage,
			selector: '.protagonist-8cca25bd0a19999a594d',
			content: 'Hovering on an element highlights related elements. To preserve related elements highlighted, click on an element.',
		},
		{
			title: 'Searching',
			image: SearchImage,
			selector: '.tour-search',
			content: 'You can search for specific contents using the search field.',
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
