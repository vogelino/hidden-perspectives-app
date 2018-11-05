import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Grid,
	Row,
	Col,
	Typography,
} from '@smooth-ui/core-sc';
import InputWrapper from '../_library/InputWrapper';
import DatePicker from '../_library/DatePicker';
import Select from '../_library/Select';
import { Form, Separator } from './styles';

const CreateForm = ({
	onSubmit,

	titleValue,
	onTitleChange,

	idValue,
	onIdChange,

	summaryValue,
	onSummaryChange,

	classificationValue,
	onClassificationChange,
	classificationOptions,

	kindValue,
	onKindChange,
	kindOptions,

	dateValue,
	onDateChange,

	publicationDateValue,
	onPublicationDateChange,
}) => (
	<Form onSubmit={onSubmit}>
		<Grid>
			<Row>
				<Col>
					<Typography variant="h2">New document</Typography>
				</Col>
			</Row>
			<Row>
				<Separator />
			</Row>
			<Row>
				<Col>
					<InputWrapper
						name="documentTitle"
						label="Title"
						placeholder="Enter the document's title"
						onChange={onTitleChange}
						multiline
						height={118}
						value={titleValue}
					/>
				</Col>
				<Col xs={4}>
					<InputWrapper
						name="documentOriginalId"
						label="Identifier"
						placeholder="Original identifier"
						description="The identifier is the filename originally present in the briefing book. For example “uir001001”."
						onChange={onIdChange}
						value={idValue}
					/>
				</Col>
			</Row>
			<Row>
				<Separator />
			</Row>
			<Row>
				<Col>
					<InputWrapper
						name="documentSummary"
						label="Summary"
						placeholder="Resume in a sentence or two the contents of the document"
						onChange={onSummaryChange}
						multiline
						height={200}
						value={summaryValue}
					/>
				</Col>
			</Row>
			<Row>
				<Separator />
			</Row>
			<Row>
				<Col>
					<InputWrapper
						name="documentKind"
						label="Kind"
						onChange={onKindChange}
						options={kindOptions}
						value={kindValue}
					>
						{(props) => <Select {...props} />}
					</InputWrapper>
				</Col>
				<Col>
					<InputWrapper
						name="documentClassification"
						label="Classification"
						onChange={onClassificationChange}
						options={classificationOptions}
						value={classificationValue}
					>
						{(props) => <Select {...props} />}
					</InputWrapper>
				</Col>
			</Row>
			<Row>
				<Separator />
			</Row>
			<Row>
				<Col>
					<InputWrapper
						name="documentDate"
						label="Creation date"
						placeholder="YYYY-MM-DD"
						onChange={onDateChange}
						value={dateValue}
						todayOrPrior
					>
						{(props) => <DatePicker {...props} />}
					</InputWrapper>
				</Col>
				<Col>
					<InputWrapper
						name="documentPublicationDate"
						label="Publication date"
						placeholder="YYYY-MM-DD"
						onChange={onPublicationDateChange}
						value={publicationDateValue}
						todayOrPrior
					>
						{(props) => <DatePicker {...props} />}
					</InputWrapper>
				</Col>
			</Row>
			<Row>
				<Separator />
			</Row>
			<Row>
				<Button as="input" type="submit" alignSelf="flex-end" value="Submit document" />
			</Row>
		</Grid>
	</Form>
);

CreateForm.defaultProps = {
	onSubmit: () => {},

	titleValue: '',
	onTitleChange: () => {},

	idValue: '',
	onIdChange: () => {},

	summaryValue: '',
	onSummaryChange: () => {},

	kindValue: undefined,
	onKindChange: () => {},
	kindOptions: [{ name: 'nothing', text: 'Nothing' }],

	classificationValue: undefined,
	onClassificationChange: () => {},
	classificationOptions: [{ name: 'nothing', text: 'Nothing' }],

	dateValue: '',
	onDateChange: () => {},

	publicationDateValue: '',
	onPublicationDateChange: () => {},
};

CreateForm.propTypes = {
	onSubmit: PropTypes.func,

	titleValue: PropTypes.string,
	onTitleChange: PropTypes.func,

	idValue: PropTypes.string,
	onIdChange: PropTypes.func,

	summaryValue: PropTypes.string,
	onSummaryChange: PropTypes.func,

	classificationValue: Select.propTypes.value,
	onClassificationChange: PropTypes.func,
	classificationOptions: PropTypes.arrayOf(Select.propTypes.value),

	kindValue: Select.propTypes.value,
	onKindChange: PropTypes.func,
	kindOptions: PropTypes.arrayOf(Select.propTypes.value),

	dateValue: PropTypes.string,
	onDateChange: PropTypes.func,

	publicationDateValue: PropTypes.string,
	onPublicationDateChange: PropTypes.func,
};

export default CreateForm;

