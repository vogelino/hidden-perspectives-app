import React from 'react';
import PropTypes from 'prop-types';
import {
	Content,
	ScrollIndicator,
	Container,
} from './styles';

const Minimap = ({
	height,
	top,
}) => (
	<Container>
		<Content>
			<ScrollIndicator height={height} top={top} />
		</Content>
	</Container>
);

Minimap.propTypes = {
	height: PropTypes.number,
	top: PropTypes.number,
};

Minimap.defaultProps = {
	height: 100,
	top: 0,
};

export default Minimap;
