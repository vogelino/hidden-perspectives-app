import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	MinimapContainer,
	BubbleChartContainer,
	EventContainer,
	Event,
	EventDate,
	EventTitleContainer,
	EventTitle,
	Events,
	Documents,
	LegendContainer,
} from './styles';
import Minimap from './Minimap';
import BubbleChart from '../BubbleChart';
import { LoadingContainer } from '../LoadingIndicator/styles';
import LoadingIndicator from '../LoadingIndicator';
import Tooltip from '../Tooltip';
import ContainerWithStickyLabel from './ContainerWithStickyLabel';
import { DocumentLegend, EventLegend } from '../Legend';

const MainTimeline = ({
	timelineItems,
	minimapItems,
	bubbleChartItems,
	errors,
	isLoading,
	fetchingProtagonists,
	onRef,
}) => (
	<Container id="mainTimeline" ref={onRef}>
		<LoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</LoadingContainer>
		{errors.map((error) => error)}
		<MinimapContainer>
			<Minimap isLoading={isLoading} items={minimapItems} />
		</MinimapContainer>
		<BubbleChartContainer>
			<BubbleChart
				isLoading={isLoading || fetchingProtagonists}
				items={bubbleChartItems}
				diameter={250}
				bubblesPadding={5}
			/>
		</BubbleChartContainer>
		<LegendContainer>
			<DocumentLegend />
			<EventLegend right />
		</LegendContainer>
		{timelineItems.map(({ year, months, ...yearKey }) => (
			<ContainerWithStickyLabel label={year} {...yearKey} isYear>
				{months.map(({ month, days, ...monthKey }) => (
					<ContainerWithStickyLabel label={month} date={`${month} ${year}`} {...monthKey}>
						{days.map(({
							day,
							key,
							events,
							documents,
							...dayKey
						}) => (
							<EventContainer key={key}>
								<Event {...dayKey}>
									<EventDate>{day}</EventDate>
									<Documents>
										{documents.map(({ title, id, path }) => (
											<EventTitleContainer key={id} className="timeline-event" data-id={id}>
												<Tooltip id={id} itemType="document">
													<EventTitle to={path}>{title}</EventTitle>
												</Tooltip>
											</EventTitleContainer>
										))}
									</Documents>
									<Events>
										{events.map(({ title, id, path }) => (
											<EventTitleContainer key={id} className="timeline-event" data-id={id}>
												<Tooltip id={id} itemType="event" position="left">
													<EventTitle to={path}>{title}</EventTitle>
												</Tooltip>
											</EventTitleContainer>
										))}
									</Events>
								</Event>
							</EventContainer>
						))}
					</ContainerWithStickyLabel>
				))}
			</ContainerWithStickyLabel>
		))}
	</Container>
);

MainTimeline.propTypes = {
	timelineItems: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			year: PropTypes.string.isRequired,
			months: PropTypes.arrayOf(
				PropTypes.shape({
					key: PropTypes.string.isRequired,
					month: PropTypes.string.isRequired,
					days: PropTypes.arrayOf(
						PropTypes.shape({
							key: PropTypes.string.isRequired,
							day: PropTypes.string.isRequired,
							events: PropTypes.arrayOf(
								PropTypes.shape({
									id: PropTypes.string.isRequired,
									title: PropTypes.string.isRequired,
									date: PropTypes.instanceOf(Date).isRequired,
								}),
							),
							documents: PropTypes.arrayOf(
								PropTypes.shape({
									id: PropTypes.string.isRequired,
									title: PropTypes.string.isRequired,
									date: PropTypes.instanceOf(Date).isRequired,
								}),
							),
						}),
					).isRequired,
				}),
			).isRequired,
		}),
	),
	minimapItems: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			density: PropTypes.number.isRequired,
		}),
	),
	bubbleChartItems: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				stakeholderFullName: PropTypes.string.isRequired,
			}),
		),
	),
	errors: PropTypes.arrayOf(PropTypes.string),
	isLoading: PropTypes.bool,
	fetchingProtagonists: PropTypes.bool,
	onRef: PropTypes.func.isRequired,
};

MainTimeline.defaultProps = {
	timelineItems: [],
	minimapItems: [],
	bubbleChartItems: {},
	errors: [],
	isLoading: true,
	fetchingProtagonists: false,
};

export default MainTimeline;
