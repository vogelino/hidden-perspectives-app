import React from 'react';
import PropTypes from 'prop-types';
import {
	Row, Label, DisplayValue, EditValue, Content,
} from './styles';

const MetadataRow = ({ label, children, mode }) => (
	<Row>
		<Label>{label}</Label>
		<Content>
			{mode === 'display'
				? <DisplayValue>{children}</DisplayValue>
				: <EditValue>{children}</EditValue>}
		</Content>
	</Row>
);


MetadataRow.propTypes = {
	label: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	mode: PropTypes.oneOf(['edit', 'display']),
};

MetadataRow.defaultProps = {
	mode: 'display',
};

export default MetadataRow;
