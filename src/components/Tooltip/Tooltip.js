import React from 'react';
import PropTypes from 'prop-types';
import {
	Trigger,
	Container,
	Content,
	Subtitle,
	Summary,
	ExploreButton,
} from './styles';
import { getShortenedString } from '../../utils/stringUtil';
import PdfThumbnail from '../PdfThumbnail';

const SUMMARY_MAX_LEN = 200;
const Tooltip = ({
	id,
	subtitle,
	summary,
	thumbnailUrl,
	isLoading,
	position,
	itemTypeName,
	path,
	noSubtitle,
	withLink,
	...rest
}) => (
	<Container id={`tooltip-${id}`} position={position} {...rest}>
		<Content>
			{!isLoading && thumbnailUrl && (
				<PdfThumbnail file={thumbnailUrl} />
			)}
			{!noSubtitle && <Subtitle variant="h6">{isLoading ? 'Loading...' : subtitle}</Subtitle>}
			{!isLoading && <Summary>{getShortenedString(summary, SUMMARY_MAX_LEN)}</Summary>}
			{withLink && path && (
				<ExploreButton
					to={path}
					primary
					onClick={(evt) => evt.stopPropagation()}
				>
					{`Explore ${itemTypeName}`}
				</ExploreButton>
			)}
		</Content>
	</Container>
);

Tooltip.propTypes = {
	id: PropTypes.string,
	subtitle: PropTypes.string,
	summary: PropTypes.string,
	thumbnailUrl: PropTypes.string,
	path: PropTypes.string,
	isLoading: PropTypes.bool,
	noSubtitle: PropTypes.bool,
	withLink: PropTypes.bool,
	position: PropTypes.oneOf(['left', 'right']),
	itemTypeName: PropTypes.oneOf(['Event', 'Document', 'Protagonist']),
};

Tooltip.defaultProps = {
	id: undefined,
	subtitle: undefined,
	summary: undefined,
	thumbnailUrl: undefined,
	path: '',
	isLoading: true,
	withLink: true,
	noSubtitle: false,
	position: 'right',
	itemTypeName: 'Document',
};

const TooltipTrigger = ({
	children,
	onMouseEnter,
	onMouseLeave,
	...props
}) => (
	<Trigger
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
	>
		{children}
		<Tooltip {...props} />
	</Trigger>
);

TooltipTrigger.propTypes = {
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	children: PropTypes.node.isRequired,
};

TooltipTrigger.defaultProps = {
	onMouseEnter: () => {},
	onMouseLeave: () => {},
};

export default TooltipTrigger;

