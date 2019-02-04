import React from 'react';
import PropTypes from 'prop-types';
import { Container, Split } from './styles';

const ContainerWithStickyLabel = ({
	label,
	children,
	isYear,
	setComponentRef,
	isEmpty,
}) => (
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
	isEmpty: PropTypes.bool,
	setComponentRef: PropTypes.func,
};

ContainerWithStickyLabel.defaultProps = {
	label: '—',
	children: null,
	isYear: false,
	isEmpty: true,
	setComponentRef: () => {},
};

export default ContainerWithStickyLabel;
