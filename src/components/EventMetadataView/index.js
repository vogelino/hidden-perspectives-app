import React from 'react';
import { compose, lifecycle, withState } from 'recompose';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import {
	prop,
	pipe,
	length,
	ifElse,
	identity,
	always,
} from 'ramda';
import { withLoading, withErrors, getErrorHandler } from '../../utils/hocUtil';
import EventMetadataView from './EventMetadataView';
import { getFormattedDate } from '../../utils/dateUtil';
import Tag from '../_library/Tag';
import Stakeholder from '../_library/Stakeholder';

const EVENT_QUERY = gql`
	query GetEvent($id: ID!) {
		Event(id: $id) {
			id
			eventTitle
			eventDescription
			eventStartDate
			eventEndDate
			eventStakeholders {
				id
				stakeholderFullName
			}
			eventTags {
				id,
				name												
			}
			eventLocations {
				id,
				locationName
			}
		}
	}
`;

const mapStakeholder = ({ id, stakeholderFullName }) => ({
	id, name: stakeholderFullName,
});
const mapLocation = ({ id, locationName }) => ({
	id, name: locationName,
});
const propHasValue = (propName) => pipe(
	prop(propName),
	ifElse(Array.isArray, length, Boolean),
);
const hasValue = propHasValue('value');
const hasValues = propHasValue('values');
const formatIfValidDate = ifElse(identity, getFormattedDate, always(null));

const passValueAsChild = (Component) => ({ value, ...props }) => (
	<Component {...props}>{value}</Component>
);


const structureData = (data) => {
	const {
		eventTitle,
		eventDescription,
		eventStartDate,
		eventEndDate,
		eventStakeholders,
		eventLocations,
		eventTags,
	} = data;

	const coreInformation = {
		groupLabel: 'Core information',
		values: [
			{ label: 'Title', value: eventTitle },
			{ label: 'Description', value: eventDescription },
			{ label: 'Start date', value: formatIfValidDate(eventStartDate) },
			{ label: 'End date', value: formatIfValidDate(eventEndDate) },
		].filter(hasValue),
	};

	const appearences = {
		groupLabel: 'Appearences',
		values: [
			{
				label: 'Protagonists',
				value: eventStakeholders.map(mapStakeholder),
				ValueComponent: passValueAsChild(Stakeholder),
			},
			{ label: 'Locations', value: eventLocations.map(mapLocation) },
		].filter(hasValue),
	};

	const categorization = {
		groupLabel: 'Categorization',
		values: [
			{
				label: 'Tags',
				value: eventTags,
				ValueComponent: passValueAsChild(Tag),
			},
		].filter(hasValue),
	};

	return [
		coreInformation,
		appearences,
		categorization,
	].filter(hasValues);
};

const getDataParser = ({ stopLoading, setData }) => ({ data }) => {
	stopLoading();
	setData(structureData(data.Event));
};

export default compose(
	withApollo,
	withLoading,
	withErrors,
	withState('data', 'setData', []),
	lifecycle({
		componentDidMount() {
			const { id, client } = this.props;
			client.query({
				query: EVENT_QUERY,
				variables: { id },
			})
				.then(getDataParser(this.props))
				.catch(getErrorHandler(this.props));
		},
	}),
)(EventMetadataView);
