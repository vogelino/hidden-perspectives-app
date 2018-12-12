import React from 'react';
import PropTypes from 'prop-types';
import { Row, Label } from './styles';

const MetadataRow = ({ label, children }) => (
	<Row>
		<Label>{label}</Label>
		{children}
	</Row>
);


MetadataRow.propTypes = {
	label: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default MetadataRow;
