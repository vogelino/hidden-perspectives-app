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
import { LoadingContainer } from '../LoadingIndicator/styles';
import {
	Container,
	Content,
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

const TranscriptView = ({ isLoading, transcript }) => (
	<Container>
		<LoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</LoadingContainer>
		{transcript && !isLoading && (
			<Content>
				<Transcript>{formatTranscript(transcript)}</Transcript>
			</Content>
		)}
	</Container>
);

TranscriptView.propTypes = {
	transcript: PropTypes.string,
	isLoading: PropTypes.bool,
};

TranscriptView.defaultProps = {
	transcript: '',
	isLoading: true,
};

export default TranscriptView;
