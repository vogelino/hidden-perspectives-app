import React from 'react';
import PropTypes from 'prop-types';
import DetailView from '../../components/DetailView';
import Header from '../../components/Header';
import NodeTitle from '../../components/NodeTitle';

const EventPage = ({ match }) => (
	<div className="EventPage">
		<Header>
			<NodeTitle
				id={match.params.id}
				itemType="event"
			/>
		</Header>
		<DetailView id={match.params.id} itemType="event" />
	</div>
);

EventPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default EventPage;

