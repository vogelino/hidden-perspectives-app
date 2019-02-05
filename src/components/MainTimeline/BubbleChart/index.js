import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import Pack from './Pack';
import { hierarchy, pack as d3Pack } from 'd3-hierarchy';
import Group from './Group';
import { Transition, animated, config } from 'react-spring';

const mockData = [
	{
		id: 'askjghhkasjhfdjkasjhkdf',
		name: 'Ludwig Frank',
		value: 1,
	},
	{
		id: 'askjghhsgfjhfdjkasjhkdf',
		name: 'Joshua Pachenco',
		value: 2,
	},
	{
		id: 'askjghhkshrffdjkasjhkdf',
		name: 'Lucas Vogel',
		value: 5,
	},
	{
		id: 'assagfhkasjhfdjkasjhkdf',
		name: 'Bela Kurek',
		value: 1,
	},
];

class BubbleChart extends PureComponent {
	static propTypes = {
		nodes: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				name: PropTypes.string,
				value: PropTypes.string,
			}),
		),
		animate: PropTypes.bool,
	};

	static defaultProps = {
		animate: false,
	};

	render() {
		if (!this.props.data.length > 0) return null;

		const nodes = hierarchy({
			name: 'nodes',
			children: this.props.data,
		}).sum((d) => d.value * 2);

		const pack = d3Pack()
			.size([200, 200])
			.padding(5);

		const data = pack(nodes);

		// if (document.getElementById('protagonist-wrapper')) {
		// 	console.log(
		// 		document
		// 			.getElementById('protagonist-wrapper')
		// 			.children.find((el) => el.style.opacity !== 1),
		// 	);
		// }

		return (
			<div style={{ top: 0, position: 'absolute' }}>
				<svg width={200} height={200} id="protagonist-wrapper">
					{this.props.animate ? (
						<Transition
							items={data.children}
							from={{ opacity: 0 }}
							enter={{ opacity: 1 }}
							leave={{ opacity: 0 }}
							// config={{ tension: 100, friction: 10 }}
							keys={(item) => item.data.id}
						>
							{(item) => ({ opacity }) => {
								return (
									<animated.g
										className={'svg-group'}
										transform={`translate(${item.x}, ${item.y})`}
										opacity={opacity}
									>
										<circle r={item.r} fill="#FF6264" />
									</animated.g>
								);
							}}
						</Transition>
					) : (
						data.children.map((item) => (
							<Group top={item.y} left={item.x}>
								<circle r={item.r} fill="#FF6264" />
							</Group>
						))
					)}
				</svg>
			</div>
		);
	}
}

export default BubbleChart;
