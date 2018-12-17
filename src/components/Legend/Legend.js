import React from 'react';
import PropTypes from 'prop-types';
import { LegendContainer, LegendLine, LegendLabel } from './styles';

const Legend = ({ nomargin }) => (
	<LegendContainer nomargin={nomargin}>
		<LegendLine>
			<LegendLabel symbol="■">Documents</LegendLabel>
		</LegendLine>
		<LegendLine>
			<LegendLabel symbol="●">Events</LegendLabel>
		</LegendLine>
	</LegendContainer>
);

Legend.propTypes = {
	nomargin: PropTypes.bool,
};

Legend.defaultProps = {
	nomargin: false,
};

export default Legend;
