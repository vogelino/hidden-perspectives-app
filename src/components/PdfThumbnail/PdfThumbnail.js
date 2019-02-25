import React from 'react';
import PropTypes from 'prop-types';
import { pdfjs, Document, Page } from 'react-pdf';
import { Container } from './styles';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfThumbnail = ({
	file,
	width,
	className,
	id,
}) => (
	<Container className={className} width={width} to={`/document/original/${id}`}>
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
				renderAnnotationLayer={false}
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
	id: PropTypes.string,
};

PdfThumbnail.defaultProps = {
	className: '',
	width: 64,
	id: '',
};

export default PdfThumbnail;
