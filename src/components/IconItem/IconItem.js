import React from 'react';
import PropTypes from 'prop-types';
import { IconContainer, IconItemStyled } from './styles';

const getDocumentIcon = (fillColor, strokeColor) => (
	<g>
		<path opacity=".54" d="M7 9h4v2H9L7 9z" fill={fillColor} />
		<path d="M4.5 5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V8.414a.5.5 0 0 0-.146-.353L7.939 4.646a.5.5 0 0 0-.353-.146H5a.5.5 0 0 0-.5.5z" stroke={strokeColor} />
		<path d="M7.5 4.5v4h4" stroke={strokeColor} />
	</g>
);

const getDocumentStackIcon = (fillColor, strokeColor) => (
	<g>
		<path d="M5.08545 12C5.29135 12.5826 5.84699 13.0001 6.50012 13.0001H11.5001C12.3285 13.0001 13.0001 12.3285 13.0001 11.5001V7.50007C13.0001 6.84699 12.5828 6.29139 12.0002 6.08545V11.5C12.0002 11.7761 11.7763 12 11.5002 12H5.08545Z" fill={fillColor} />
		<path opacity="0.54" d="M6 8H10V10H8L6 8Z" fill={fillColor} />
		<path d="M3.5 4V10C3.5 10.2761 3.72386 10.5 4 10.5H10C10.2761 10.5 10.5 10.2761 10.5 10V7.41421C10.5 7.28161 10.4473 7.15443 10.3536 7.06066L6.93934 3.64645C6.84557 3.55268 6.71839 3.5 6.58579 3.5H4C3.72386 3.5 3.5 3.72386 3.5 4Z" stroke={strokeColor} />
		<path d="M6.5 3.5V7.5H10.5" stroke={strokeColor} />
	</g>
);

const getEventIcon = (fillColor, strokeColor) => (
	<g fill="none" fillRule="evenodd">
		<path fill={strokeColor} d="M11,5 L5,5 L5,11 L11,11 L11,5 Z M5,4 C4.44772,4 4,4.44772 4,5 L4,11 C4,11.5523 4.44772,12 5,12 L11,12 C11.5523,12 12,11.5523 12,11 L12,5 C12,4.44772 11.5523,4 11,4 L5,4 Z" />
		<polygon fill={fillColor} fillRule="nonzero" points="6 3 7 3 7 5 9 5 9 3 10 3 10 5 11 5 11 8 5 8 5 5 6 5" />
		<polygon fill={strokeColor} fillRule="nonzero" points="5 7 11 7 11 8 5 8" opacity=".396" />
	</g>
);

const getEventStackIcon = (fillColor, strokeColor) => (
	<g fill="none" fillRule="evenodd">
		<path fill={fillColor} fillRule="nonzero" d="M5.08545,12 C5.29137,12.5826 5.84699,13 6.5001,13 L11.5001,13 C12.3285,13 13.0001,12.3284 13.0001,11.5 L13.0001,6.49997 C13.0001,5.84686 12.5827,5.29125 12.0001,5.08533 L12.0001,11.5 C12.0001,11.7761 11.7762,12 11.5001,12 L5.08545,12 Z" />
		<path fill={strokeColor} d="M10,4 L4,4 L4,10 L10,10 L10,4 Z M4,3 C3.44772,3 3,3.44772 3,4 L3,10 C3,10.5523 3.44772,11 4,11 L10,11 C10.5523,11 11,10.5523 11,10 L11,4 C11,3.44772 10.5523,3 10,3 L4,3 Z" />
		<polygon fill={fillColor} fillRule="nonzero" points="5 2 6 2 6 4 8 4 8 2 9 2 9 4 10 4 10 7 4 7 4 4 5 4" />
		<polygon fill={strokeColor} fillRule="nonzero" points="4 6 10 6 10 7 4 7" opacity=".396" />
	</g>
);

const getStakeholderIcon = (fillColor, strokeColor) => (
	<g>
		<path d="M4.759 8.913a5.677 5.677 0 0 0-1.348 1.326c-.288.406-.083.931.367 1.145.985.468 2.53 1.116 3.722 1.116 1.193 0 2.737-.648 3.723-1.116.45-.214.655-.739.367-1.145a5.678 5.678 0 0 0-1.348-1.326A3.986 3.986 0 0 1 7.5 10 3.986 3.986 0 0 1 4.76 8.913z" fill={fillColor} />
		<mask id="a" fill="#fff">
			<path fillRule="evenodd" clipRule="evenodd" d="M7.5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
		</mask>
		<path fillRule="evenodd" clipRule="evenodd" d="M7.5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill={strokeColor} />
		<path d="M8.5 6a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3h-2zm-1-1a1 1 0 0 1 1 1h2a3 3 0 0 0-3-3v2zm-1 1a1 1 0 0 1 1-1V3a3 3 0 0 0-3 3h2zm1 1a1 1 0 0 1-1-1h-2a3 3 0 0 0 3 3V7zm2-1a2 2 0 0 1-2 2v2a4 4 0 0 0 4-4h-2zm-2-2a2 2 0 0 1 2 2h2a4 4 0 0 0-4-4v2zm-2 2a2 2 0 0 1 2-2V2a4 4 0 0 0-4 4h2zm2 2a2 2 0 0 1-2-2h-2a4 4 0 0 0 4 4V8z" fill={strokeColor} mask="url(#a)" />
		<circle opacity=".34" cx="7.5" cy="6" r="2" fill={fillColor} />
	</g>
);

const getSvgContent = (itemType, isStack, fillColor, strokeColor) => {
	const params = [fillColor, strokeColor];
	switch (itemType) {
	case 'event': return !isStack ? getEventIcon(...params) : getEventStackIcon(...params);
	case 'document': return !isStack ? getDocumentIcon(...params) : getDocumentStackIcon(...params);
	case 'stakeholder': return getStakeholderIcon(...params);
	default: return '';
	}
};

const IconItem = ({
	itemType,
	isCurrent,
	hovered,
	size,
	theme,
	isStack,
}) => {
	const {
		primaryDark,
		iconFillPrimary,
		iconStrokePrimary,
	} = theme;

	let fillColor = iconFillPrimary;
	let strokeColor = iconStrokePrimary;

	if (isCurrent) {
		fillColor = 'white';
		strokeColor = 'white';
	}
	if (hovered) {
		fillColor = primaryDark;
		strokeColor = primaryDark;
	}

	return (
		<IconContainer size={size}>
			<IconItemStyled
				height="16"
				width="16"
				viewBox="0 0 16 16"
				preserveAspectRatio="none"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				{getSvgContent(itemType, isStack, fillColor, strokeColor)}
			</IconItemStyled>
		</IconContainer>
	);
};

IconItem.propTypes = {
	itemType: PropTypes.string.isRequired,
	theme: PropTypes.shape().isRequired,
	isCurrent: PropTypes.bool,
	hovered: PropTypes.bool,
	isStack: PropTypes.bool,
	size: PropTypes.number,
};

IconItem.defaultProps = {
	isCurrent: false,
	hovered: false,
	isStack: false,
	size: 16,
};

export default IconItem;
