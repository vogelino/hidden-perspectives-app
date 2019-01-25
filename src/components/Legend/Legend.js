import React from 'react';
import PropTypes from 'prop-types';
import { LegendLabel, MainTimelineContainer, Right } from './styles';

const getCountSuffix = (label, count, isLoading) => (
	isLoading ? label : `${label} (${count})`
);

export const DocumentLegend = ({ right, itemCount, isLoading }) => (
	<LegendLabel right={right}>
		{getCountSuffix('Documents', itemCount, isLoading)}
	</LegendLabel>
);

export const EventLegend = ({ right, itemCount, isLoading }) => (
	<LegendLabel symbol="●" right={right}>
		{getCountSuffix('Events', itemCount, isLoading)}
	</LegendLabel>
);

export const MainTimelineLegend = ({ documentsCount, eventsCount, isLoading }) => (
	<MainTimelineContainer>
		<DocumentLegend
			itemCount={documentsCount}
			isLoading={isLoading}
		/>
		<Right>
			<EventLegend
				itemCount={eventsCount}
				isLoading={isLoading}
			/>
		</Right>
	</MainTimelineContainer>
);

const legendProptypes = {
	right: PropTypes.bool,
	itemCount: PropTypes.number,
	isLoading: PropTypes.bool,
};

const legendDefaultProps = {
	right: false,
	itemCount: 0,
	isLoading: true,
};

DocumentLegend.propTypes = legendProptypes;
EventLegend.propTypes = legendProptypes;

DocumentLegend.defaultProps = legendDefaultProps;
EventLegend.defaultProps = legendDefaultProps;

MainTimelineLegend.propTypes = {
	documentsCount: legendProptypes.itemCount,
	eventsCount: legendProptypes.itemCount,
	isLoading: legendProptypes.isLoading,
};

MainTimelineLegend.defaultProps = {
	documentsCount: legendDefaultProps.itemCount,
	eventsCount: legendDefaultProps.itemCount,
	isLoading: legendDefaultProps.isLoading,
};
