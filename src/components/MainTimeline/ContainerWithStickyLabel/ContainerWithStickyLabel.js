import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label } from './styles';

const ContainerWithStickyLabel = ({
	label,
	children,
	isYear,
	date,
}) => (
	<Container>
		<Label
			isYear={isYear}
			className={`timeline-item ${isYear ? 'timeline-year' : 'timeline-month'}`}
			data-date={date}
		>
			{label}
		</Label>
		{children}
	</Container>
);

ContainerWithStickyLabel.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	isYear: PropTypes.bool,
	date: PropTypes.string,
};

ContainerWithStickyLabel.defaultProps = {
	label: '—',
	children: null,
	isYear: false,
	date: undefined,
};

export default ContainerWithStickyLabel;
