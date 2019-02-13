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

const getEventIcon = (fillColor, strokeColor) => (
	<g>
		<rect x="4" y="5" width="8" height="3" rx="1" fill={fillColor} />
		<rect x="4.5" y="4.5" width="7" height="7" rx="0.51" stroke={strokeColor} />
		<path fill={fillColor} stroke="fillColor" strokeWidth=".5" d="M6.25 3.25h.5v2.5h-.5z" />
		<path opacity=".84" fill={strokeColor} d="M11 7v1H5V7z" />
		<path fill={fillColor} stroke="fillColor" strokeWidth=".5" d="M9.25 3.25h.5v2.5h-.5z" />
		<path opacity=".54" fill={fillColor} d="M5 7h6v1H5z" />
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

const getSvgContent = (itemType, fillColor, strokeColor) => {
	switch (itemType) {
	case 'event': return getEventIcon(fillColor, strokeColor);
	case 'document': return getDocumentIcon(fillColor, strokeColor);
	case 'stakeholder': return getStakeholderIcon(fillColor, strokeColor);
	default: return '';
	}
};

const IconItem = ({
	itemType,
	isCurrent,
	hovered,
	size,
	theme,
	pinned,
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
	if (hovered || pinned) {
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
				{getSvgContent(itemType, fillColor, strokeColor)}
			</IconItemStyled>
		</IconContainer>
	);
};

IconItem.propTypes = {
	itemType: PropTypes.string.isRequired,
	theme: PropTypes.shape().isRequired,
	isCurrent: PropTypes.bool,
	hovered: PropTypes.bool,
	pinned: PropTypes.bool,
	size: PropTypes.number,
};

IconItem.defaultProps = {
	isCurrent: false,
	hovered: false,
	pinned: false,
	size: 16,
};

export default IconItem;
