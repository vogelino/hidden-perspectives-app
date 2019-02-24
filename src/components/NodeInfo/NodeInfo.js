import React from 'react';
import PropTypes from 'prop-types';
import PdfThumbnail from '../PdfThumbnail';
import Stakeholder from '../_library/Stakeholder';
import Headline from '../_library/Headline';
import Item from '../_library/Item';
import {
	Container,
	Title,
	Subtitle,
	Description,
	DescriptionLimitGradient,
	ShowMoreText,
	TitleContainer,
	StakholderImage,
	AuthorsContainer,
} from './styles';

const DESCRIPTION_MAX_LENGTH = 400;

const isDescriptionLonger = (description) => description.length > DESCRIPTION_MAX_LENGTH;

const getDescription = (description, expanded) => {
	if (expanded || !isDescriptionLonger(description)) return description;
	return `${description.substring(0, DESCRIPTION_MAX_LENGTH)}...`;
};

const NodeInfo = ({
	subtitle,
	title,
	description,
	descriptionExpanded,
	toggleDescriptionExpansion,
	image,
	original,
	authors,
	locations,
	id,
}) => {
	const isLonger = description && isDescriptionLonger(description);
	const clickHandler = isLonger ? () => toggleDescriptionExpansion(!descriptionExpanded) : () => {};
	return (
		<Container className="tour-entry-information">
			<TitleContainer>
				{image && <StakholderImage image={image} />}
				{original && <PdfThumbnail file={original} id={id} />}
				{subtitle && (
					<Subtitle variant="h6">{subtitle}</Subtitle>
				)}
				{title && <Title variant="h4">{title}</Title>}
			</TitleContainer>
			{description && (
				<Description onClick={clickHandler} expanded={descriptionExpanded || !isLonger}>
					{getDescription(description, descriptionExpanded)}
					{isLonger && (
						<>
							<DescriptionLimitGradient />
							<ShowMoreText>Show more</ShowMoreText>
						</>
					)}
				</Description>
			)}

			{authors.length > 0 && (
				<AuthorsContainer>
					<Headline variant="h6">{authors.length === 1 ? 'Author' : 'Authors'}</Headline>
					{authors.map(({ authorId, name }) => (
						<Stakeholder
							key={authorId}
							id={authorId}
							to={`/protagonist/context/${authorId}`}
						>
							{name}
						</Stakeholder>
					))}
				</AuthorsContainer>
			)}
			{locations.length > 0 && (
				<AuthorsContainer>
					<Headline variant="h6">{locations.length === 1 ? 'Location' : 'Locations'}</Headline>
					{locations.map(({ locationId, name }) => (
						<Item
							key={locationId}
							id={locationId}
							to={`/location/context/${locationId}`}
							itemType="location"
							nowrap
						>
							{name}
						</Item>
					))}
				</AuthorsContainer>
			)}
		</Container>
	);
};

NodeInfo.propTypes = {
	subtitle: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	original: PropTypes.string,
	image: PropTypes.string,
	descriptionExpanded: PropTypes.bool.isRequired,
	toggleDescriptionExpansion: PropTypes.func.isRequired,
	authors: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	})),
	locations: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	})),
	id: PropTypes.string,
};

NodeInfo.defaultProps = {
	title: undefined,
	subtitle: undefined,
	description: undefined,
	image: undefined,
	original: undefined,
	authors: [],
	locations: [],
	id: '',
};

export default NodeInfo;
