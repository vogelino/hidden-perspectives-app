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
} from './styles';
import Minimap from './Minimap';
import { getFormattedDate } from '../../utils/dateUtil';

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
		{isLoading && 'Loading...'}
		{errors.map((error) => (error))}
		<MinimapContainer>
			<Minimap
				events={minimapEvents}
				documents={minimapDocuments}
			/>
		</MinimapContainer>
		<EventsContainer height={containerHeight}>
			{events.map((group) => {
				const {
					id,
					eventTitle,
					yPosition,
					eventStartDate,
				} = group[0];
				return (
					<Event style={{ top: `${yPosition}px` }} key={id}>
						{group.length > 1
							? <MultipleEventsPill>{group.length}</MultipleEventsPill>
							: <SingleEventPill />
						}
						<EventDate>{getFormattedDate(eventStartDate)}</EventDate>
						<EventTitleContainer>
							<EventTitle>{eventTitle.trim() || 'Untitled'}</EventTitle>
						</EventTitleContainer>
					</Event>
				);
			})}
			{documents.map((group) => {
				const {
					id,
					documentTitle,
					yPosition,
					documentCreationDate,
				} = group[0];
				return (
					<Document style={{ top: `${yPosition}px` }} key={id}>
						{group.length > 1
							? <MultipleDocumentsPill />
							: <SingleDocumentPill />
						}
						<EventDate>{getFormattedDate(documentCreationDate)}</EventDate>
						<EventTitleContainer>
							<EventTitle>{documentTitle.trim() || 'Untitled'}</EventTitle>
						</EventTitleContainer>
					</Document>
				);
			})}
		</EventsContainer>
	</Container>
);

MainTimeline.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			eventTitle: PropTypes.string.isRequired,
			yPosition: PropTypes.number.isRequired,
			eventStartDate: PropTypes.instanceOf(Date).isRequired,
		})),
	),
	documents: PropTypes.arrayOf(
		PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			documentTitle: PropTypes.string.isRequired,
			yPosition: PropTypes.number.isRequired,
			documentCreationDate: PropTypes.instanceOf(Date).isRequired,
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
