import React from 'react';
import PropTypes from 'prop-types';
import { LegendLabel, MainTimelineContainer, Right } from './styles';

export const DocumentLegend = ({ right, itemCount }) => (
	<LegendLabel right={right}>{`Documents (${itemCount})`}</LegendLabel>
);

export const EventLegend = ({ right, itemCount }) => (
	<LegendLabel symbol="●" right={right}>{`Events (${itemCount})`}</LegendLabel>
);

export const MainTimelineLegend = () => (
	<MainTimelineContainer>
		<DocumentLegend />
		<Right>
			<EventLegend />
		</Right>
	</MainTimelineContainer>
);

const legendProptypes = {
	right: PropTypes.bool,
	itemCount: PropTypes.number,
};

const legendDefaultProps = {
	right: false,
	itemCount: 0,
};

DocumentLegend.propTypes = legendProptypes;
EventLegend.propTypes = legendProptypes;

DocumentLegend.defaultProps = legendDefaultProps;
EventLegend.defaultProps = legendDefaultProps;
