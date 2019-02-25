import React from 'react';
import PropTypes from 'prop-types';
import IconItem from '../IconItem';
import Tooltip from '../Tooltip';
import {
	ScrollWrapper,
	Container,
	HistoryEntry,
	IconContainer,
} from './styles';

const HistoryBreadcrumb = ({
	pages,
	currentPageUrl,
}) => {
	if (currentPageUrl.startsWith('/unsupported-browser')) return null;
	return (
		<ScrollWrapper>
			<Container>
				{pages.map(({
					id,
					itemType,
					title,
					url,
					onClick,
					icon,
				}) => {
					const entry = (
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
					);
					if (!id || !itemType || url === currentPageUrl || itemType === 'stakeholder') return entry;
					return (
						<Tooltip itemType={itemType} id={id} key={url} position="left">
							{entry}
						</Tooltip>
					);
				})}
			</Container>
		</ScrollWrapper>
	);
};

HistoryBreadcrumb.propTypes = {
	pages: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		itemType: PropTypes.string,
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
