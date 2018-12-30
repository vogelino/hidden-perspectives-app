import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../LoadingIndicator';
import { LoadingContainer } from '../LoadingIndicator/styles';
import { Container } from './styles';
import Legend from '../Legend/Legend';
import CircleTimeline from '../CircleTimeline';
import SummarySection from '../SummarySection';

const DetailView = ({ item, isLoading, ...rest }) => (
	<Container>
		<LoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</LoadingContainer>
		<Legend nomargin />
		{item && <CircleTimeline item={item} {...rest} />}
		{item && <SummarySection item={item} {...rest} />}
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
