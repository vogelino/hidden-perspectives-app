import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label } from './styles';

const ContainerWithStickyLabel = ({
	label,
	children,
}) => (
	<Container>
		<Label>{label}</Label>
		{children}
	</Container>
);

ContainerWithStickyLabel.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

ContainerWithStickyLabel.defaultProps = {
	label: '—',
	children: null,
};

export default ContainerWithStickyLabel;
