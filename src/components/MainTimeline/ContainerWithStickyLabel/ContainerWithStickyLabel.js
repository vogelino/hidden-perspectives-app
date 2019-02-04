import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label, Split } from './styles';

const ContainerWithStickyLabel = ({ label, children, isYear, setComponentRef, isEmpty }) => (
	<Container ref={setComponentRef}>
		<Split isEmpty={isEmpty} hasContent={!isYear}>
			{isEmpty ? '·' : label}
		</Split>
		{children}
	</Container>
);

ContainerWithStickyLabel.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	isYear: PropTypes.bool,
	setComponentRef: PropTypes.func,
};

ContainerWithStickyLabel.defaultProps = {
	label: '—',
	children: null,
	isYear: false,
	setComponentRef: () => {},
};

export default ContainerWithStickyLabel;
