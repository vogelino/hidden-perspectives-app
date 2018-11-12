import React from 'react';
import PropTypes from 'prop-types';

const EventPage = ({ match }) => (
	<div className="EventPage">
		{match.params.id}
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

