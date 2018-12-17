import { compose, mapProps } from 'recompose';
import {
	flatten,
	sortWith,
	ascend,
	prop,
} from 'ramda';
import SummarySection from './SummarySection';

const formatEvents = (events) => flatten(events).map(({
	id,
	eventTitle,
	eventStartDate,
	eventDescription,
}) => ({
	id,
	title: eventTitle,
	date: new Date(eventStartDate),
	summary: eventDescription,
	type: 'Event',
}));

const formatDocuments = (documents) => flatten(documents).map(({
	id,
	documentTitle,
	documentCreationDate,
	documentDescription,
	documentKind,
}) => ({
	id,
	title: documentTitle,
	date: new Date(documentCreationDate),
	summary: documentDescription,
	type: documentKind.name,
}));

export default compose(
	mapProps(({ events, documents }) => ({
		items: sortWith(
			[ascend(prop('date')), ascend(prop('title'))],
			[...formatEvents(events), ...formatDocuments(documents)],
		),
	})),
)(SummarySection);

