import * as d3 from 'd3';

export const calcBubbleLayout = (data, diameter, padding) => {
	const packLayout = d3.pack()
		.size([diameter, diameter])
		.padding(padding);

	const rootNode = d3
		.hierarchy(data)
		.sum((d) => d.value);

	return packLayout(rootNode);
};

export const calcForceLayout = (bubbleItems, diameter, padding = 1) => {
	if (bubbleItems !== undefined) {
		const nodeData = bubbleItems.map((item) => ({ r: item.r }));

		const chargeForce = d3.forceCollide().radius((d) => (d.r + padding));
		const radialForce = d3.forceRadial(() => diameter / 4);
		const simulation = d3.forceSimulation(nodeData)
			.force('charge', chargeForce)
			.force('r', radialForce)
			.stop();

		const numberOfTicks = 300;
		for (let tickIndex = 0; tickIndex <= numberOfTicks; tickIndex += 1) {
			simulation.tick();
		}

		return bubbleItems.map((item, index) => {
			const { x, y } = nodeData[index];
			return {
				...item,
				x: x + diameter / 2,
				y: y + diameter / 2,
			};
		});
	}

	return bubbleItems;
};
