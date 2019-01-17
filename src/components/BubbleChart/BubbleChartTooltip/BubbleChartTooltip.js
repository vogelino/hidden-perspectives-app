import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from './styles';

const BubbleChartTooltip = ({
	text,
	visible,
	x,
	y,
}) => (
	<Tooltip
		visible={visible}
		x={x}
		y={y}
	>
		{text}
	</Tooltip>
);

BubbleChartTooltip.propTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	text: PropTypes.string,
	visible: PropTypes.bool,
};

BubbleChartTooltip.defaultProps = {
	x: 0,
	y: 0,
	text: '',
	visible: false,
};

export default BubbleChartTooltip;
