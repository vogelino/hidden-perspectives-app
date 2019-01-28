import { compose, withProps, lifecycle } from 'recompose';
import {
	flatten,
	sortWith,
	ascend,
	prop,
} from 'ramda';
import { formatGraphcoolDocument, formatGraphcoolEvent } from '../../utils/graphcoolUtil';
import { getHoveredSummary } from '../../utils/timelineUtil';
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
	lifecycle({
		componentWillUpdate(nextProps) {
			const { hoveredElement } = nextProps;
			const hoveredElementIsArray = Array.isArray(hoveredElement);
			if (hoveredElement && hoveredElementIsArray) {
				const element = getHoveredSummary(nextProps.hoveredElement);
				if (!element) return;
				element.scrollIntoView({ behavior: 'smooth' });
			}
		},
	}),
)(SummarySection);

