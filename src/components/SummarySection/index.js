import { compose, withProps } from 'recompose';
import {
	flatten,
	sortWith,
	ascend,
	prop,
} from 'ramda';
import { formatGraphcoolDocument, formatGraphcoolEvent } from '../../utils/graphcoolUtil';
import SummarySection from './SummarySection';

const formatEvents = (events) => flatten(events).map(formatGraphcoolEvent);
const formatDocuments = (documents) => flatten(documents).map(formatGraphcoolDocument);

export default compose(
	withProps(({ events, documents }) => ({
		items: sortWith(
			[ascend(prop('date')), ascend(prop('title'))],
			[...formatEvents(events), ...formatDocuments(documents)],
		),
	})),
)(SummarySection);

