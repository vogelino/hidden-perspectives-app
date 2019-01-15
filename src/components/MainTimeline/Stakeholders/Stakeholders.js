import React from 'react';
import PropTypes from 'prop-types';
import BubbleChart from '../../BubbleChart';
import { Container } from './styles';

const Stakeholders = (props) => (
	<Container>
		<BubbleChart
			{...props}
			diameter={250}
			bubblesPadding={5}
		/>
	</Container>
);

Stakeholders.propTypes = {
	items: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				stakeholderFullName: PropTypes.string.isRequired,
			}),
		),
	),
	isLoading: PropTypes.bool,
};

Stakeholders.defaultProps = {
	items: {},
	isLoading: true,
};

export default Stakeholders;
