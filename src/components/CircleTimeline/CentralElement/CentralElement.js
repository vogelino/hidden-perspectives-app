import React from 'react';
import PropTypes from 'prop-types';
import { Circle, Pdf } from './styles';

const CentralElement = ({
	image,
	original,
	formattedDate,
	itemType,
	id,
}) => {
	const cN = { className: 'tour-central-element' };
	if (image) return <Circle {...cN} style={{ backgroundImage: `url("${image}")` }} />;
	if (original) return <Circle {...cN}><Pdf file={original} width={160} id={id} /></Circle>;
	if (itemType === 'event') return <Circle {...cN}>{formattedDate.split(' ').map((string) => <div key={string}>{string}</div>)}</Circle>;
	return <Circle {...cN} />;
};

CentralElement.propTypes = {
	image: PropTypes.string,
	original: PropTypes.string,
	formattedDate: PropTypes.string,
	itemType: PropTypes.string,
	id: PropTypes.string,
};

CentralElement.defaultProps = {
	image: undefined,
	original: undefined,
	formattedDate: undefined,
	itemType: undefined,
	id: '',
};

export default CentralElement;
