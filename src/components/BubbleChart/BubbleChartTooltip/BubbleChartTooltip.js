import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Tooltip, TooltipNumber } from './styles';

const BubbleChartTooltip = ({
	text,
	visible,
	x,
	y,
	r,
	value,
}) => (
	<Wrapper
		x={x - r}
		y={y - r}
		width={r * 2}
		height={r * 2}
		visible={visible}
	>
		<Tooltip>
			{text}
			<TooltipNumber>{value}</TooltipNumber>
		</Tooltip>
	</Wrapper>
);

BubbleChartTooltip.propTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	r: PropTypes.number,
	text: PropTypes.string,
	visible: PropTypes.bool,
	value: PropTypes.number,
};

BubbleChartTooltip.defaultProps = {
	x: 0,
	y: 0,
	r: 0,
	text: '',
	visible: false,
	value: 0,
};

export default BubbleChartTooltip;
