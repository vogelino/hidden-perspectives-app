import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
	compose,
	withHandlers,
	withState,
} from 'recompose';
import OriginalCreateDocumentForm from '../components/CreateForm';
import { StoryWrapper } from './styles';

const kindOptions = [
	{
		name: 'conference-materials',
		text: 'Conference Materials',
	},
	{
		name: 'executive-order',
		text: 'Executive Order',
	},
	{
		name: 'speech',
		text: 'Speech',
	},
	{
		name: 'report',
		text: 'Report',
	},
];

const classificationOptions = [
	{
		name: 'no-classification',
		text: 'No classification',
	},
	{
		name: 'classification-unknown',
		text: 'Classification unknown',
	},
	{
		name: 'secret',
		text: 'Secret',
	},
	{
		name: 'top-secret',
		text: 'Top Secret',
	},
];

const CreateFormWithState = compose(
	withState('titleValue', 'onTitleChange', ({ value }) => value || ''),
	withState('idValue', 'onIdChange', ({ value }) => value || ''),
	withState('summaryValue', 'onSummaryChange', ({ value }) => value || ''),
	withState('dateValue', 'onDateChange', ({ value }) => value || ''),
	withState('publicationDateValue', 'onPublicationDateChange', ({ value }) => value || ''),
	withState('kindValue', 'onKindChange', kindOptions[0]),
	withState('classificationValue', 'onClassificationChange', classificationOptions[0]),
	withHandlers({
		onSubmit: ({
			titleValue,
			idValue,
			summaryValue,
			kindValue,
			classificationValue,
			dateValue,
			publicationDateValue,
		}) => (evt) => {
			evt.preventDefault();
			action('Form submitted')({
				titleValue,
				idValue,
				summaryValue,
				kindValue,
				classificationValue,
				dateValue,
				publicationDateValue,
			});
		},
	}),
)(OriginalCreateDocumentForm);

const CreateForm = (props) => (
	<StoryWrapper maxWidth={688}>
		<CreateFormWithState
			{...props}
			classificationOptions={classificationOptions}
			kindOptions={kindOptions}
		/>
	</StoryWrapper>
);
CreateForm.propTypes = OriginalCreateDocumentForm.propTypes;

storiesOf('Forms', module)
	.add('Create document form', () => (
		<CreateForm />
	));


