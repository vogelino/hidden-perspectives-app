import React from 'react';
import PropTypes from 'prop-types';
import { Circle, Pdf, Link } from './styles';

const CentralElement = ({
	image,
	original,
	formattedDate,
	itemType,
	id,
}) => {
	if (image) return <Circle style={{ backgroundImage: `url("${image}")` }} />;
	if (original) return <Link to={`/document/original/${id}`}><Circle><Pdf file={original} width={160} /></Circle></Link>;
	if (itemType === 'event') return <Circle>{formattedDate.split(' ').map((string) => <div key={string}>{string}</div>)}</Circle>;
	return <Circle />;
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
	id: undefined,
};

export default CentralElement;
