import React from 'react';
import PropTypes from 'prop-types';
import {
	pipe,
	split,
	map,
	join,
	filter,
	identity,
	addIndex,
} from 'ramda';
import LoadingIndicator from '../LoadingIndicator';
import Errors from '../Errors';
import NodeSidebar from '../NodeSidebar';
import { LoadingContainer } from '../LoadingIndicator/styles';
import {
	Container,
	Content,
	TranscriptScrollContainer,
	Transcript,
	Line,
	LineContent,
} from './styles';

const createLineKey = (idx) => join('-', ['line', idx]);
const wrapIntoSpan = (line, idx) => (
	<Line key={createLineKey(idx)}>
		<LineContent>{line}</LineContent>
	</Line>
);

const formatTranscript = pipe(
	split('\n'),
	filter(identity),
	addIndex(map)(wrapIntoSpan),
);

const TranscriptView = ({
	isLoading,
	transcript,
	id,
	errors,
}) => (
	<Container>
		<Errors errors={errors} />
		<LoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</LoadingContainer>
		<NodeSidebar id={id} itemType="document" />
		{transcript && !isLoading && (
			<TranscriptScrollContainer>
				<Content>
					<Transcript>{formatTranscript(transcript)}</Transcript>
				</Content>
			</TranscriptScrollContainer>
		)}
	</Container>
);

TranscriptView.propTypes = {
	id: PropTypes.string.isRequired,
	transcript: PropTypes.string,
	isLoading: PropTypes.bool,
	errors: Errors.propTypes.errors,
};

TranscriptView.defaultProps = {
	transcript: '',
	isLoading: true,
	errors: Errors.defaultProps.errors,
};

export default TranscriptView;
