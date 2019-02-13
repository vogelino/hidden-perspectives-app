import React from 'react';
import PropTypes from 'prop-types';
import { pdfjs, Document, Page } from 'react-pdf';
import { Container } from './styles';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfThumbnail = ({ file, width, className }) => (
	<Container className={className} width={width}>
		<Document
			file={file}
			loading=" "
			error=" "
			noData=" "
			renderMode="canvas"
		>
			<Page
				pageNumber={1}
				width={width}
				renderInteractiveForms={false}
				renderTextLayer={false}
				loading=" "
				error=" "
				noData=" "
			/>
		</Document>
	</Container>
);

PdfThumbnail.propTypes = {
	file: PropTypes.string.isRequired,
	className: PropTypes.string,
	width: PropTypes.number,
};

PdfThumbnail.defaultProps = {
	className: '',
	width: 64,
};

export default PdfThumbnail;
