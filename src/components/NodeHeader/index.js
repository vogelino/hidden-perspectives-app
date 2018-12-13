import { withProps } from 'recompose';
import { propEq, ifElse, curry } from 'ramda';
import { ucFirst } from '../../utils/stringUtil';
import NodeHeader from './NodeHeader';

const createUrl = curry(({ itemType, id }, path) => `/${itemType}/${path}/${id}`);

const createTab = (props, page) => ({
	label: ucFirst(page),
	url: createUrl(props, page),
});

const getEventTabs = (props) => [
	createTab(props, 'context'),
	createTab(props, 'metadata'),
];

const getDocumentTabs = (props) => [
	createTab(props, 'context'),
	createTab(props, 'transcript'),
	createTab(props, 'original'),
	createTab(props, 'metadata'),
];

const isEvent = propEq('itemType', 'event');
const createEditUrl = (props) => `${createUrl(props, 'metadata')}/edit`;
const getTabs = ifElse(isEvent, getEventTabs, getDocumentTabs);
const createProps = (props) => ({
	tabs: getTabs(props),
	editUrl: createEditUrl(props),
});

export default withProps(createProps)(NodeHeader);
