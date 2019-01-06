import React from 'react';
import PropTypes from 'prop-types';
import { pdfjs, Document, Page } from 'react-pdf';
import LoadingIndicator from '../LoadingIndicator';
import { LoadingContainer } from '../LoadingIndicator/styles';
import { Container, Content } from './styles';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const createPageKey = (idx) => ['page', idx].join('-');

const OriginalView = ({
	file,
	setErrors,
	stopLoading,
	isLoading,
	pagesCount,
	setPagesCount,
}) => (
	<Container>
		<LoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</LoadingContainer>
		{file && (
			<Content>
				<Document
					file={file}
					loading=""
					error=""
					renderMode="canvas"
					onLoadSuccess={({ _pdfInfo }) => {
						setPagesCount(_pdfInfo.numPages);
						stopLoading();
					}}
					onLoadError={(err) => {
						setErrors([err]);
						stopLoading([err]);
					}}
				>
					{[...Array(pagesCount)].map((_, idx) => (
						<Page key={createPageKey(idx)} pageNumber={idx + 1} />
					))}
				</Document>
			</Content>
		)}
	</Container>
);

OriginalView.propTypes = {
	file: PropTypes.string,
	setErrors: PropTypes.func,
	stopLoading: PropTypes.func,
	setPagesCount: PropTypes.func,
	pagesCount: PropTypes.number,
	isLoading: PropTypes.bool,
};

OriginalView.defaultProps = {
	file: undefined,
	setErrors: () => undefined,
	stopLoading: () => undefined,
	setPagesCount: () => undefined,
	pagesCount: 0,
	isLoading: true,
};

export default OriginalView;
