import React from 'react';
import { LegendContainer, LegendLine, LegendLabel } from './styles';

const Legend = () => (
	<LegendContainer>
		<LegendLine>
			<LegendLabel symbol="■">Documents</LegendLabel>
		</LegendLine>
		<LegendLine>
			<LegendLabel symbol="●">Events</LegendLabel>
		</LegendLine>
	</LegendContainer>
);

export default Legend;
