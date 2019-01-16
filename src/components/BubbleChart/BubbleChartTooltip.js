import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from './styles';

const BubbleChartTooltip = ({ text, visible, position }) => (
	<Tooltip visible={visible} position={position}>{text}</Tooltip>
);

BubbleChartTooltip.propTypes = {
	position: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number,
	}),
	text: PropTypes.string,
	visible: PropTypes.bool,
};

BubbleChartTooltip.defaultProps = {
	position: {
		x: 0,
		y: 0,
	},
	text: '',
	visible: false,
};

export default BubbleChartTooltip;

