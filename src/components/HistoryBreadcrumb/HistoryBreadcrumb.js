import React from 'react';
import PropTypes from 'prop-types';
import IconItem from '../IconItem';
import {
	ScrollWrapper,
	Container,
	HistoryEntry,
	IconContainer,
} from './styles';

const HistoryBreadcrumb = ({
	pages,
	currentPageUrl,
}) => (!currentPageUrl.startsWith('/unsupported-browser') ? (
	<ScrollWrapper>
		<Container>
			{pages.map(({
				title,
				url,
				onClick,
				icon,
			}) => (
				<HistoryEntry
					key={url}
					onClick={onClick}
					className={url === currentPageUrl && 'active'}
					hasIcon={!!icon}
				>
					{icon && (
						<IconContainer>
							<IconItem
								itemType={icon.itemType}
								isCurrent={url === currentPageUrl}
								size={24}
							/>
						</IconContainer>
					)}
					{title}
				</HistoryEntry>
			))}
		</Container>
	</ScrollWrapper>
) : null);

HistoryBreadcrumb.propTypes = {
	pages: PropTypes.arrayOf(PropTypes.shape({
		url: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
		icon: PropTypes.shape({
			itemType: PropTypes.string.isRequired,
		}),
	})),
	currentPageUrl: PropTypes.string,
};

HistoryBreadcrumb.defaultProps = {
	pages: [],
	currentPageUrl: '',
};

export default HistoryBreadcrumb;
