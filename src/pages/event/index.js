import React from 'react';
import PropTypes from 'prop-types';
import DetailView from '../../components/DetailView';

const EventPage = ({ match }) => (
	<div className="EventPage">
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

