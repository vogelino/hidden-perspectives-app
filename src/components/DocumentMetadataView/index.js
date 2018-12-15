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
import DocumentMetadataView from './DocumentMetadataView';
import { getFormattedDate } from '../../utils/dateUtil';
import Tag from '../_library/Tag';
import Stakeholder from '../_library/Stakeholder';

const DOCUMENT_QUERY = gql`
	query GetDocument($id: ID!) {
		Document(id: $id) {
			id
			documentTitle
			documentDescription
			documentKind {
				id
				name
			}
			documentClassification {
				id
				name
			}
			documentAuthors {
				id
				stakeholderFullName
			}
			documentCreationDate
			documentPublicationDate
			mentionedStakeholders {
				id
				stakeholderFullName
			}
			mentionedLocations {
				id,
				locationName
			}
			documentTags {
				id,
				name												
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
	const coreInformation = {
		groupLabel: 'Core information',
		values: [
			{ label: 'Title', value: data.documentTitle },
			{ label: 'Summary', value: data.documentDescription },
			{
				label: 'Authors',
				value: data.documentAuthors.map(mapStakeholder),
				ValueComponent: passValueAsChild(Stakeholder),
			},
			{ label: 'Creation date', value: formatIfValidDate(data.documentCreationDate) },
			{ label: 'Publication date', value: formatIfValidDate(data.documentPublicationDate) },
		].filter(hasValue),
	};

	const appearences = {
		groupLabel: 'Appearences',
		values: [
			{
				label: 'Protagonists',
				value: data.mentionedStakeholders.map(mapStakeholder),
				ValueComponent: passValueAsChild(Stakeholder),
			},
			{ label: 'Locations', value: data.mentionedLocations.map(mapLocation) },
		].filter(hasValue),
	};

	const categorization = {
		groupLabel: 'Categorization',
		values: [
			{ label: 'Kind', value: data.documentKind.name },
			{ label: 'Classification', value: data.documentClassification.name },
			{
				label: 'Tags',
				value: data.documentTags,
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
	setData(structureData(data.Document));
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
				query: DOCUMENT_QUERY,
				variables: { id },
			})
				.then(getDataParser(this.props))
				.catch(getErrorHandler(this.props));
		},
	}),
)(DocumentMetadataView);
