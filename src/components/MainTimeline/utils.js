const newDay = (dateUnitIndex, { day, month, year }, rest = { documents: [], events: [] }) => ({
	key: `${year}-${month}-${day}`,
	dateUnitIndex,
	...rest,
});

const newMonth = (dateUnitIndex, { month, year }, days = []) => ({
	key: `${year}-${month}`,
	dateUnitIndex,
	days,
});

const generateMonths = (year) => {
	const months = [];
	for (let i = 1; i < 13; i += 1) {
		months.push(newMonth(i, { month: i, year }));
	}
	return months;
};

const newYear = (dateUnitIndex, months = generateMonths(dateUnitIndex)) => ({
	key: `${dateUnitIndex}`,
	dateUnitIndex,
	months,
});

const getContainerName = (item) => (item.eventTitle ? 'events' : 'documents');

export const parseItemsToDates = (initialYear = 1971, nodes) => {
	let currentYear = initialYear - 1;

	const years = [];

	nodes.forEach((node) => {
		const nodeYear = parseInt(node.dateString.split('-')[0], 10);
		const nodeMonth = parseInt(node.dateString.split('-')[1], 10);
		const nodeDay = parseInt(node.dateString.split('-')[2], 10);
		const dateUnits = {
			year: nodeYear,
			month: nodeMonth,
			day: nodeDay,
		};

		function placeNode() {
			if (nodeYear > currentYear) {
				years.push(newYear(currentYear + 1));
				currentYear += 1;
				placeNode();
			} else if (nodeYear === currentYear) {
				const sameDay = years[years.length - 1].months[nodeMonth - 1].days
					.find((day) => day.dateUnitIndex === nodeDay);

				if (sameDay) {
					sameDay[getContainerName(node)].push(node);
				} else {
					const dayItem = { documents: [], events: [] };
					dayItem[getContainerName(node)] = [node];
					years[years.length - 1].months[nodeMonth - 1].days.push(
						newDay(nodeDay, dateUnits, dayItem),
					);
				}
			}
		}
		placeNode();
	});

	console.log(years);
	return years;
};
