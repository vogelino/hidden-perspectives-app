import * as d3 from 'd3';

const calcForceLayout = () => {
	const bubble = document.getElementById('bubble');
	if (bubble) {
		return;
	}

	const size = 500;
	const nodes = d3.range(10).map(() => ({ r: Math.random() * 40 + 4 }));

	const node = d3
		.select('body')
		.append('svg')
		.attr('id', 'bubble')
		.attr('width', size)
		.attr('height', size)
		.style('border', '2px solid red')
		.style('left', 300)
		.style('top', 150)
		.style('position', 'absolute')
		.append('g')
		.selectAll('circle')
		.data(nodes)
		.enter()
		.append('circle')
		.attr('r', (d) => d.r)
		.attr('fill', 'red');


	function ticked() {
		node
			.attr('cx', (d) => (d.x + size / 2))
			.attr('cy', (d) => (d.y + size / 2));
	}

	d3.forceSimulation(nodes)
		.force('charge', d3.forceCollide().radius((d) => d.r))
		.force('r', d3.forceRadial(() => 100))
		.on('tick', ticked);
};

export default calcForceLayout;
