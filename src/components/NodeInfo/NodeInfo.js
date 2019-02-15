import React from 'react';
import PropTypes from 'prop-types';
import PdfThumbnail from '../PdfThumbnail';
import Stakeholder from '../_library/Stakeholder';
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
import Headline from '../_library/Headline';

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
}) => {
	const isLonger = description && isDescriptionLonger(description);
	const clickHandler = isLonger ? () => toggleDescriptionExpansion(!descriptionExpanded) : () => {};
	return (
		<Container>
			<TitleContainer>
				{image && <StakholderImage image={image} />}
				{original && <PdfThumbnail file={original} />}
				{subtitle && (
					<Subtitle variant="h6">{subtitle}</Subtitle>
				)}
				<Title variant="h4">{title}</Title>
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
					{authors.map(({ id, name }) => (
						<Stakeholder
							key={id}
							id={id}
							to={`/protagonist/context/${id}`}
						>
							{name}
						</Stakeholder>
					))}
				</AuthorsContainer>
			)}
		</Container>
	);
};

NodeInfo.propTypes = {
	subtitle: PropTypes.string,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	original: PropTypes.string,
	image: PropTypes.string,
	descriptionExpanded: PropTypes.bool.isRequired,
	toggleDescriptionExpansion: PropTypes.func.isRequired,
	authors: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	})),
};

NodeInfo.defaultProps = {
	subtitle: undefined,
	description: undefined,
	image: undefined,
	original: undefined,
	authors: [],
};

export default NodeInfo;
