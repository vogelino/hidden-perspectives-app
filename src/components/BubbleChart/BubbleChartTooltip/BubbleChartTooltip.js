import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, TooltipNumber } from './styles';

const BubbleChartTooltip = ({
	text,
	visible,
	x,
	y,
	value,
	onClick,
}) => (
	<Tooltip
		visible={visible}
		x={x}
		y={y}
		onClick={onClick}
	>
		{text}
		<TooltipNumber>{value}</TooltipNumber>
	</Tooltip>
);

BubbleChartTooltip.propTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	text: PropTypes.string,
	visible: PropTypes.bool,
	value: PropTypes.number,
	onClick: PropTypes.func,
};

BubbleChartTooltip.defaultProps = {
	x: 0,
	y: 0,
	text: '',
	visible: false,
	value: 0,
	onClick: () => {},
};

export default BubbleChartTooltip;
