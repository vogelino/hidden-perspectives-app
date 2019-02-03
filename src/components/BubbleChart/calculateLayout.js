/* eslint-disable no-plusplus */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
import * as d3 from 'd3';

function collide(node) {
	let r = node.radius + 16;
	const nx1 = node.x - r;
	const nx2 = node.x + r;
	const ny1 = node.y - r;
	const ny2 = node.y + r;

	return (quad, x1, y1, x2, y2) => {
		if (quad.point && (quad.point !== node)) {
			let x = node.x - quad.point.x;
			let y = node.y - quad.point.y;
			let l = Math.sqrt(x * x + y * y);

			r = node.radius + quad.point.radius;

			if (l < r) {
				l = (l - r) / l * 0.5;

				node.x -= x *= l;
				node.y -= y *= l;

				quad.point.x += x;
				quad.point.y += y;
			}
		}

		return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
	};
}

const calcForceLayout = (data) => {
	console.log(data);

	const width = 960;
	const height = 960;

	const nodes = d3.range(30).map(() => ({ radius: Math.random() * 20 + 4 }));
	const root = nodes[0];
	const color = d3.scaleOrdinal(d3.schemeCategory10);


	root.radius = 20;
	root.fixed = true;
	root.px = width / 2;
	root.py = height / 2;

	// const force = d3.layout.force()
	// 	.gravity(0.1)
	// 	.charge((d, i) => (i ? 0 : -2000))
	// 	.nodes(nodes)
	// 	.size([width, height]);

	const force = d3.forceSimulation(nodes)
		.force('charge', d3.forceManyBody().strength((d, i) => (i === 0 ? -100 : 0)))
		.force('center', d3.forceCenter(width / 2, height / 2));
		// .force('link', d3.forceLink().distance((d) => d.distance).strength(0.1))
		// .on('tick', console.log)

	console.log(nodes);

	const svg = d3.select('body').append('svg')
		.attr('width', width)
		.attr('height', height)
		.style('top', 0)
		.style('position', 'absolute');

	svg.selectAll('circle')
		.data(nodes.slice(1))
		.enter().append('circle')
		.attr('r', (d) => d.radius)
		.style('fill', (d, i) => color(i % 3));

	force.on('tick', () => {
		const q = d3.quadtree(nodes);
		let i = 0;
		const n = nodes.length;

		while (++i < n) q.visit(collide(nodes[i]));

		svg.selectAll('circle')
			.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.y);
	});
};

export default calcForceLayout;
