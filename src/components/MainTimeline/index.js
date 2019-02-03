import { withApollo } from "react-apollo";
import { compose, lifecycle, withState, withHandlers } from "recompose";
import gql from "graphql-tag";
import { filter, map, groupBy, union, propEq, either, prop, flatten, reduce, merge } from "ramda";
import debounce from "lodash.debounce";
import MainTimeline from "./MainTimeline";
import { withLoading, withErrors, getErrorHandler } from "../../utils/hocUtil";
import { getMinimap, isFullyInViewport } from "../../utils/timelineUtil";
import { ucFirst } from "../../utils/stringUtil";
import isDocumentId from "../../utils/isDocumentId";
import {
	monthsLabels,
	getDifferenceInYears,
	formatYear,
	ensureTwoDigits,
	getFormattedDate
} from "../../utils/dateUtil";

const ALL_EVENTS_AND_DOCUMENTS = gql`
	{
		allEvents(orderBy: eventStartDate_ASC, first: 100) {
			id
			eventTitle
			eventStartDate
			eventStakeholders {
				id
			}
		}
		allDocuments(orderBy: documentCreationDate_ASC, first: 100) {
			id
			documentTitle
			documentCreationDate
			mentionedStakeholders {
				id
			}
		}
	}
`;

const getFilterArgsForQuery = (type, itemIds) => map((id) => `{ id: "${id}" }`, itemIds);

const builtProtagonistQueryStringByType = (type, itemIds) => {
	const stakeholdersFieldName =
		type === "document" ? "mentionedStakeholders" : "eventStakeholders";
	const query = `
		all${ucFirst(type)}s(
			filter: {
				OR: [
					${getFilterArgsForQuery(type, itemIds)}
				]
			}
		) {
			id
			${type}Title
			${stakeholdersFieldName} {
				id
				stakeholderFullName
			}
		}
	`;
	return query;
};

const protagonistQueries = (groupedItemIds) =>
	Object.keys(groupedItemIds).map((key) =>
		builtProtagonistQueryStringByType(key, groupedItemIds[key])
	); // eslint-disable-line
const builtProtagonistQuery = (itemIds) => gql`
	query {
		${protagonistQueries(itemIds)}
	}
`;

const normaliseItems = ({ items, itemDateProperty, itemTitleProperty, itemType }) =>
	items.map((props) => {
		const date = new Date(props[itemDateProperty]);
		const { id } = props;
		return {
			...props,
			id,
			date,
			dateString: getFormattedDate(date),
			title: props[itemTitleProperty],
			path: `/${itemType}/context/${id}`,
			type: itemType
		};
	});

const getMonthFormat = (strg) => strg.substring(0, strg.length - 3);
const structureItems = ({ datesArray, timelineEvents, timelineDocuments }) => {
	const startYear = parseInt(formatYear(datesArray[0], "YYYY"), 10);
	const yearsAmount = getDifferenceInYears(...datesArray);

	console.time("NEW PARSE ALGORITHM");
	const nodes = [...timelineEvents, ...timelineDocuments].sort((a, b) => {
		const dateA = Date.parse(a.dateString);
		const dateB = Date.parse(b.dateString);

		if (dateA > dateB) return 1;
		if (dateA < dateB) return -1;
		return 0;
	});

	const generateMonths = () => {
		let months = [];
		for (let i = 1; i < 13; i++) {
			months.push(newMonth(i));
		}
		return months;
	};

	const newDay = (date, items = []) => {
		return {
			date,
			items
		};
	};

	const newMonth = (date, days = []) => {
		return {
			date,
			days
		};
	};

	const newYear = (date, months = generateMonths()) => {
		return {
			date,
			months
		};
	};

	const generate = (initialYear = 1970, initialMonth = 1) => {
		let currentYear = initialYear;
		let currentMonth = initialMonth;

		const years = [];

		nodes.forEach((node) => {
			const nodeYear = parseInt(node.dateString.split("-")[0]);
			const nodeMonth = parseInt(node.dateString.split("-")[1]);
			const nodeDay = parseInt(node.dateString.split("-")[2]);

			function placeNode() {
				if (nodeYear > currentYear) {
					years.push(newYear(currentYear + 1));
					currentYear++;
					placeNode();
				}

				if (nodeYear === currentYear) {
					const sameDay = years[years.length - 1].months[nodeMonth - 1].days.find(
						(day) => {
							return day.date === nodeDay;
						}
					);

					sameDay
						? sameDay.items.push(node)
						: years[years.length - 1].months[nodeMonth - 1].days.push(
								newDay(nodeDay, [node])
						  );
				}

				return;
			}

			placeNode();
		});

		return years;
	};

	console.time("new");
	console.log(generate());
	console.timeEnd("new");

	let lastMonth = null;
	let lastDay = null;

	let currentMonthData = [];

	const years = nodes.reduce((acc, cur, ind) => {});
	const year = {
		date: 1980
	};

	const months = nodes.reduce((acc, cur, ind, arr) => {
		// If the current node is in a new month ...
		if (getMonthFormat(cur.dateString) !== lastMonth) {
			lastMonth = getMonthFormat(cur.dateString);
			return [
				...acc,
				{
					date: getMonthFormat(cur.dateString),
					month: parseInt(cur.dateString.split("-")[1]),
					days: [
						{
							date: cur.dateString,
							items: [cur]
						}
					]
				}
			];
		} else {
			// The node is in the same month like the one before ...
			const daysInCurrentMonth = acc[acc.length - 1].days;

			// If the date is already present, push the node to the array
			const sameDay = daysInCurrentMonth.find((day) => day.date === cur.dateString);

			sameDay
				? sameDay.items.push(cur)
				: acc[acc.length - 1].days.push({
						date: cur.dateString,
						items: [cur]
				  });

			return acc;
		}
	}, []);
	console.timeEnd("NEW PARSE ALGORITHM");

	console.log(months);

	console.time("OLD PARSE ALGORITHM");
	const items = [...Array(yearsAmount)].map((_, yearIdx) => {
		const year = `${startYear + yearIdx}`;
		return {
			key: year,
			year,
			months: [...Array(12)].map((__, monthIdx) => {
				const month = monthsLabels[monthIdx];
				const monthNumber = ensureTwoDigits(monthIdx + 1);
				return {
					key: `${year}-${monthNumber}`,
					month,
					days: [...Array(31)]
						.map((___, dayIdx) => {
							const day = ensureTwoDigits(dayIdx + 1);
							const dayId = `${year}-${monthNumber}-${day}`;
							const filterDateString = filter(propEq("dateString", dayId));
							return {
								key: dayId,
								day: `${dayIdx + 1}`,
								events: filterDateString(timelineEvents),
								documents: filterDateString(timelineDocuments)
							};
						})
						.filter(
							({ events, documents }) =>
								(events && events.length > 0) || (documents && documents.length > 0)
						)
				};
			})
		};
	});

	console.timeEnd("OLD PARSE ALGORITHM");

	return items;
};

const getClusteredProtagonists = ({ data: { allEvents: events, allDocuments: documents } }) => {
	const combinedEventsAndDocuments = union(events, documents);
	const protagonists = map(
		either(prop("mentionedStakeholders"), prop("eventStakeholders")),
		combinedEventsAndDocuments
	);

	return reduce(
		(acc, current) =>
			merge(acc, {
				[current.id]: (acc[current.id] || []).concat(current)
			}),
		{},
		flatten(protagonists)
	);
};

const parseItems = ({ events, datesArray, documents }) => {
	const timelineEvents = normaliseItems({
		items: events,
		itemDateProperty: "eventStartDate",
		itemTitleProperty: "eventTitle",
		itemType: "event"
	});

	const timelineDocuments = normaliseItems({
		items: documents,
		itemDateProperty: "documentCreationDate",
		itemTitleProperty: "documentTitle",
		itemType: "document"
	});

	return structureItems({
		datesArray,
		timelineEvents,
		timelineDocuments
	});
};

const getEventsAndDocuments = ({
	setTimelineItems,
	stopLoading,
	setMinimapItems,
	setDocumentsCount,
	setEventsCount
}) => ({ data: { allEvents: events, allDocuments: documents } }) => {
	console.timeEnd("fetching");
	const items = parseItems({
		events,
		documents,
		datesArray: [
			new Date(documents[0].documentCreationDate),
			new Date(documents[documents.length - 1].documentCreationDate)
		]
	});

	setTimelineItems(items);
	setMinimapItems(getMinimap(items));
	setDocumentsCount(documents.length);
	setEventsCount(events.length);
	stopLoading();
};

const getEventIdsInViewport = (timelineElement) => {
	const timelineEvents = timelineElement.getElementsByClassName("timeline-event");
	const eventIds = [...timelineEvents]
		.filter(isFullyInViewport)
		.map((timelineEvent) => timelineEvent.getAttribute("data-id"));

	return eventIds;
};

const getProtagonistsInViewport = (timelineElement, props) => {
	const { setBubbleChartItems, setFetchingProtagonists, setProtagonistsCount } = props;

	const timelineEventIds = getEventIdsInViewport(timelineElement);

	if (timelineEventIds.length > 0) {
		const groupById = groupBy((id) => (isDocumentId(id) ? "document" : "event"));
		const groupedItemIds = groupById(timelineEventIds);

		setFetchingProtagonists(true);

		props.client
			.query({
				query: builtProtagonistQuery(groupedItemIds)
			})
			.then((response) => {
				const clusteredProtagonists = getClusteredProtagonists(response);
				setProtagonistsCount(Object.keys(clusteredProtagonists).length);
				setBubbleChartItems(clusteredProtagonists);
				setFetchingProtagonists(false);
			})
			.catch(getErrorHandler(props));
	} else {
		setBubbleChartItems({});
	}
};

const onRef = (props) => (ref) => {
	if (ref) {
		props.setTimelineContainer(ref);
		ref.addEventListener(
			"scroll",
			debounce((event) => getProtagonistsInViewport(event.target, props), 350)
		);
	}
};

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withState("timelineItems", "setTimelineItems", []),
	withState("eventsCount", "setEventsCount", 0),
	withState("documentsCount", "setDocumentsCount", 0),
	withState("protagonistsCount", "setProtagonistsCount", 0),
	withState("minimapItems", "setMinimapItems", []),
	withState("bubbleChartItems", "setBubbleChartItems", {}),
	withState("timelineContainer", "setTimelineContainer", null),
	withState("fetchingProtagonists", "setFetchingProtagonists", true),
	withState("initialProtagonistsFetched", "setInitialProtagonistsFetched", false),
	withState("hoveredElement", "setHoveredElement", null),
	withHandlers({ onRef }),
	lifecycle({
		componentDidMount() {
			const { props } = this;

			console.time("fetching");
			props.client
				.query({ query: ALL_EVENTS_AND_DOCUMENTS })
				.then(getEventsAndDocuments(props))
				.catch(getErrorHandler(props));
		},
		componentDidUpdate() {
			const {
				initialProtagonistsFetched,
				setInitialProtagonistsFetched,
				timelineContainer
			} = this.props;

			if (!initialProtagonistsFetched) {
				setInitialProtagonistsFetched(true);
				getProtagonistsInViewport(timelineContainer, this.props);
			}
		},
		shouldComponentUpdate(nextProps) {
			return (
				nextProps.timelineItems.length !== this.props.timelineItems.length ||
				nextProps.bubbleChartItems !== this.props.bubbleChartItems ||
				nextProps.fetchingProtagonists !== this.props.fetchingProtagonists ||
				nextProps.errors.length !== this.props.errors.length ||
				nextProps.isLoading !== this.props.isLoading ||
				nextProps.eventsCount !== this.props.eventsCount ||
				nextProps.documentsCount !== this.props.documentsCount ||
				nextProps.protagonistsCount !== this.props.protagonistsCount ||
				nextProps.hoveredElement !== this.props.hoveredElement
			);
		}
	})
)(MainTimeline);
