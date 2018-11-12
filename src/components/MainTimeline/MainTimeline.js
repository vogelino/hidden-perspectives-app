import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Event,
	EventsContainer,
	MultipleEventsPill,
	SingleEventPill,
	MultipleDocumentsPill,
	SingleDocumentPill,
	EventDate,
	EventTitleContainer,
	EventTitle,
	MinimapContainer,
	Document,
	LoadingContainer,
} from './styles';
import Minimap from './Minimap';
import TimelineItemsList from './TimelineItemsList';
import LoadingIndicator from '../LoadingIndicator';

const MainTimeline = ({
	events,
	minimapEvents,
	documents,
	minimapDocuments,
	containerHeight,
	errors,
	isLoading,
}) => (
	<Container id="mainTimeline">
		<LoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</LoadingContainer>
		{errors.map((error) => (error))}
		<MinimapContainer>
			<Minimap
				isLoading={isLoading}
				events={minimapEvents}
				documents={minimapDocuments}
			/>
		</MinimapContainer>
		<EventsContainer height={containerHeight}>
			<TimelineItemsList
				items={events}
				ContainerComponent={Event}
				SinglePillComponent={SingleEventPill}
				MultiplePillsComponent={MultipleEventsPill}
				DateComponent={EventDate}
				TitleContainerComponent={EventTitleContainer}
				TitleComponent={EventTitle}
			/>
			<TimelineItemsList
				items={documents}
				ContainerComponent={Document}
				SinglePillComponent={SingleDocumentPill}
				MultiplePillsComponent={MultipleDocumentsPill}
				DateComponent={EventDate}
				TitleContainerComponent={EventTitleContainer}
				TitleComponent={EventTitle}
			/>
		</EventsContainer>
	</Container>
);

MainTimeline.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			yPosition: PropTypes.number.isRequired,
			date: PropTypes.string.isRequired,
		})),
	),
	documents: PropTypes.arrayOf(
		PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			yPosition: PropTypes.number.isRequired,
			date: PropTypes.string.isRequired,
		})),
	),
	minimapEvents: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		density: PropTypes.number.isRequired,
		position: PropTypes.number.isRequired,
	})),
	minimapDocuments: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		density: PropTypes.number.isRequired,
		position: PropTypes.number.isRequired,
	})),
	containerHeight: PropTypes.number,
	errors: PropTypes.arrayOf(PropTypes.string),
	isLoading: PropTypes.bool,
};

MainTimeline.defaultProps = {
	events: [],
	minimapEvents: [],
	documents: [],
	minimapDocuments: [],
	containerHeight: window.innerHeight,
	errors: [],
	isLoading: true,
};

export default MainTimeline;
