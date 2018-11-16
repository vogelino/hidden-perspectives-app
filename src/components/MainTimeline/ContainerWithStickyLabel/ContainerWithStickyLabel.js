import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label } from './styles';

const ContainerWithStickyLabel = ({
	label,
	children,
	isYear,
}) => (
	<Container>
		<Label isYear={isYear}>{label}</Label>
		{children}
	</Container>
);

ContainerWithStickyLabel.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	isYear: PropTypes.bool,
};

ContainerWithStickyLabel.defaultProps = {
	label: '—',
	children: null,
	isYear: false,
};

export default ContainerWithStickyLabel;
