import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hierarchy, pack as d3Pack } from 'd3-hierarchy';
import { useTransition, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import { BubbleTextWrapper, BubbleText, ChartWrapper } from './styles';
import { parseName } from '../../../utils/stringUtil';

const AnimatedBubbles = ({ data }) => {
	const transitions = useTransition(data, (item) => item.data.id, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
	});

	return transitions.map(({
		item, key, props, state,
	}) => {
		const parseNameOptions = {
			containerWidth: item.r,
			containerHeight: item.r,
			// Average letter width to approximate the rendered length.
			letterWidth: 4,
			letterHeight: 10,
		};

		const name = parseName(item.data.name, parseNameOptions);

		if (state !== 'leave') {
			return (
				<Link to={`/protagonist/context/${item.data.id}`} key={key}>
					<animated.g
						transform={`translate(${item.x}, ${item.y})`}
						opacity={props.opacity}
					>
						<circle r={item.r} fill="#E6E8EB" />
						<foreignObject
							x={-(item.r / 2)}
							y={-(item.r / 2)}
							width={item.r}
							height={item.r}
						>
							<BubbleTextWrapper>
								<BubbleText noBreak={name.includes('.') && name.length < 16}>
									{name}
								</BubbleText>
							</BubbleTextWrapper>
						</foreignObject>
					</animated.g>
				</Link>
			);
		}
		return null;
	});
};

class BubbleChart extends PureComponent {
	static propTypes = {
		data: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				name: PropTypes.string,
				value: PropTypes.string,
			}),
		).isRequired,
	};

	render() {
		if (!this.props.data.length) return null;

		const nodes = hierarchy({
			name: 'nodes',
			children: this.props.data,
		}).sum((d) => d.value * 2);

		const pack = d3Pack()
			.size([300, 300])
			.padding(5);

		const data = pack(nodes);

		return (
			<ChartWrapper>
				<svg width={300} height={300} id="protagonist-wrapper">
					<AnimatedBubbles data={data.children} />
				</svg>
			</ChartWrapper>
		);
	}
}

export default BubbleChart;
