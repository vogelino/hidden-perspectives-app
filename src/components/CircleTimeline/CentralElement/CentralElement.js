import React from 'react';
import PropTypes from 'prop-types';
import { Circle, Pdf } from './styles';

const CentralElement = ({
	image,
	original,
	formattedDate,
	itemType,
}) => {
	if (image) return <Circle style={{ backgroundImage: `url("${image}")` }} />;
	if (original) return <Circle><Pdf file={original} width={160} /></Circle>;
	if (itemType === 'event') return <Circle>{formattedDate}</Circle>;
	return <Circle />;
};

CentralElement.propTypes = {
	image: PropTypes.string,
	original: PropTypes.string,
	formattedDate: PropTypes.string,
	itemType: PropTypes.string,
};

CentralElement.defaultProps = {
	image: undefined,
	original: undefined,
	formattedDate: undefined,
	itemType: undefined,
};

export default CentralElement;
