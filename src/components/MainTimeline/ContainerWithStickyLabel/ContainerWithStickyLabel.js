import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label, Split } from './styles';

const ContainerWithStickyLabel = ({
	label,
	children,
	isYear,
	setComponentRef,
}) => (
	<Container ref={setComponentRef}>
		<Label
			isYear={isYear}
			className={`timeline-item ${isYear ? 'timeline-year' : 'timeline-month'}`}
		>
			<Split hasContent={!isYear}>{!isYear && label}</Split>
			<Split hasContent={isYear}>{isYear && label}</Split>
		</Label>
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
