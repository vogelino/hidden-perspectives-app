import React from 'react';
import PropTypes from 'prop-types';
import { LegendLabel, MainTimelineContainer, Right } from './styles';

const getCountSuffix = (label, count, isLoading) => (
	isLoading ? label : `${label} (${count})`
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

const createLegendComponent = (label, symbol) => {
	const Legend = ({ right, itemCount, isLoading }) => (
		<LegendLabel symbol={symbol} right={right}>
			{getCountSuffix(label, itemCount, isLoading)}
		</LegendLabel>
	);

	Legend.propTypes = legendProptypes;
	Legend.defaultProps = legendDefaultProps;

	return Legend;
};

export const DocumentLegend = createLegendComponent('Documents');
export const EventLegend = createLegendComponent('Events', '●');
export const ProtagonistLegend = createLegendComponent('Protagonists', '⚯');

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
