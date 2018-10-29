import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, SubmitButton, Form } from './styles';

const CreateForm = ({
	onSubmit,
	onTitleChange,
	onOriginalIdChange,
}) => (
	<Form onSubmit={onSubmit}>
		<TextInput
			name="documentTitle"
			placeholder="Enter the document's title"
			onChange={onTitleChange}
		/>
		<TextInput
			name="documentOriginalId"
			placeholder="Enter the original document identifier"
			onChange={onOriginalIdChange}
		/>
		<SubmitButton value="Create document" />
	</Form>
);

CreateForm.defaultProps = {
	onSubmit: () => {},
	onTitleChange: () => {},
	onOriginalIdChange: () => {},
};

CreateForm.propTypes = {
	onSubmit: PropTypes.func,
	onTitleChange: PropTypes.func,
	onOriginalIdChange: PropTypes.func,
};

export default CreateForm;

