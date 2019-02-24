import React from 'react';
import PropTypes from 'prop-types';
import CircleTimeline from '../CircleTimeline';
import SummarySection from '../SummarySection';
import LabelFilters from '../LabelFilters';
import NodeInfo from '../NodeInfo';
import FeaturesTour from '../FeaturesTour';
import { Container, Sidebar, LeftSidebarContent } from './styles';

const DetailView = ({
	item,
	isLoading,
	tourIsOpen,
	onTourClose,
	...rest
}) => (
	<Container>
		<FeaturesTour
			page="circleTimeline"
			isOpen={tourIsOpen}
			onClose={onTourClose}
		/>
		{item && !isLoading && (
			<Sidebar>
				<LeftSidebarContent>
					<NodeInfo item={item} isLoading={isLoading} {...rest} />
					<LabelFilters item={item} isLoading={isLoading} {...rest} />
				</LeftSidebarContent>
			</Sidebar>
		)}
		{item && <CircleTimeline item={item} isLoading={isLoading} {...rest} />}
		{item && !isLoading && (
			<Sidebar>
				<SummarySection item={item} isLoading={isLoading} {...rest} />
			</Sidebar>
		)}
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
	tourIsOpen: PropTypes.bool,
	onTourClose: PropTypes.func,
};

DetailView.defaultProps = {
	item: undefined,
	isLoading: true,
	documents: [],
	events: [],
	protagonists: {},
	tourIsOpen: false,
	onTourClose: () => {},
};

export default DetailView;
