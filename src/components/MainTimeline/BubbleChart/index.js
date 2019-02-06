import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hierarchy, pack as d3Pack } from 'd3-hierarchy';
import { Transition, animated, config } from 'react-spring';
import { Link } from 'react-router-dom';

import { BubbleTextWrapper, BubbleText, ChartWrapper } from './styles';
import { parseName } from '../../../utils/stringUtil';

class BubbleChart extends PureComponent {
	static propTypes = {
		data: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				name: PropTypes.string,
				value: PropTypes.string,
			}),
		),
		animate: PropTypes.bool,
	};

	static defaultProps = {
		animate: true,
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
					{this.props.animate ? (
						<Transition
							items={data.children}
							from={{ opacity: 0 }}
							enter={{ opacity: 1 }}
							leave={{ display: 'none' }}
							// config={{ tension: 100, friction: 10 }}
							keys={(item) => item.data.id}
						>
							{(item) => ({ opacity }) => {
								const parseNameOptions = {
									containerWidth: item.r,
									containerHeight: item.r,
									// Average letter width to approximate the rendered length.
									letterWidth: 6,
									letterHeight: 14,
								};

								const name = parseName(item.data.name, parseNameOptions);
								const noBreak = name.split('.').length > 1 && name.length < 16;

								return (
									<Link to={`/protagonist/context/${item.data.id}`}>
										<animated.g
											transform={`translate(${item.x}, ${item.y})`}
											opacity={opacity}
										>
											<circle r={item.r} fill="#E6E8EB" />
											<foreignObject
												x={-(item.r / 2)}
												y={-(item.r / 2)}
												width={item.r}
												height={item.r}
											>
												<BubbleTextWrapper>
													<BubbleText noBreak={noBreak}>
														{name}
													</BubbleText>
												</BubbleTextWrapper>
											</foreignObject>
										</animated.g>
									</Link>
								);
							}}
						</Transition>
					) : (
						data.children.map((item) => (
							<Link to={`/protagonist/context/${item.id}`}>
								<g transform={`translate(${item.x}, ${item.y})`} key={item.id}>
									<circle r={item.r} fill="#FF6264" />
								</g>
							</Link>
						))
					)}
				</svg>
			</ChartWrapper>
		);
	}
}

export default BubbleChart;
