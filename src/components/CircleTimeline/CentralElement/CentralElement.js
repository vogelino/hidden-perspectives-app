import React from 'react';
import PropTypes from 'prop-types';
import { Circle, Pdf } from './styles';

const CentralElement = ({ image, original, formattedDate }) => {
	if (image) return <Circle style={{ backgroundImage: `url("${image}")` }} />;
	if (original) return <Circle><Pdf file={original} width={160} /></Circle>;
	return (
		<Circle>
			{formattedDate}
		</Circle>
	);
};

CentralElement.propTypes = {
	image: PropTypes.string,
	original: PropTypes.string,
	formattedDate: PropTypes.string,
};

CentralElement.defaultProps = {
	image: undefined,
	original: undefined,
	formattedDate: undefined,
};

export default CentralElement;
