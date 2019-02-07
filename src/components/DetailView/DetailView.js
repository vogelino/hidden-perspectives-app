import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import CircleTimeline from '../CircleTimeline';
import SummarySection from '../SummarySection';
import LabelFilters from '../LabelFilters';

const DetailView = ({ item, isLoading, ...rest }) => (
	<Container>
		{item && <LabelFilters item={item} isLoading={isLoading} {...rest} />}
		{item && <CircleTimeline item={item} isLoading={isLoading} {...rest} />}
		{item && <SummarySection item={item} isLoading={isLoading} {...rest} />}
	</Container>
);

DetailView.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string,
		itemType: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
	}),
	documents: PropTypes.arrayOf(
		PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			angle: PropTypes.number.isRequired,
		})),
	),
	events: PropTypes.arrayOf(
		PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			angle: PropTypes.number.isRequired,
		})),
	),
	protagonists: PropTypes.objectOf(
		PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string,
			stakeholderFullName: PropTypes.string,
		})),
	),
	isLoading: PropTypes.bool,
};

DetailView.defaultProps = {
	item: undefined,
	isLoading: true,
	documents: [],
	events: [],
	protagonists: {},
};

export default DetailView;
