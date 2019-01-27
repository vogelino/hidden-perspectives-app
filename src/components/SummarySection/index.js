import { compose, withProps, lifecycle } from 'recompose';
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
	lifecycle({
		componentDidUpdate() {
			const { hoveredElement } = this.props;
			const hoveredElementIsArray = Array.isArray(hoveredElement);
			if (hoveredElement && hoveredElementIsArray) {
				const indexInMiddle = Math.round((hoveredElement.length - 1) / 2);
				const idToScrollTo = hoveredElement[indexInMiddle].id;
				const cssIdOfElement = `summary-${idToScrollTo}`;
				const element = document.getElementById(cssIdOfElement);
				if (!element) return;
				element.scrollIntoView({ behavior: 'smooth' });
			}
		},
	}),
)(SummarySection);

