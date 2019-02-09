import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Title,
	Subtitle,
	Description,
	DescriptionLimitGradient,
	ShowMoreText,
	TitleContainer,
	StakholderImage,
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
}) => {
	const isLonger = isDescriptionLonger(description);
	const clickHandler = isLonger ? () => toggleDescriptionExpansion(!descriptionExpanded) : () => {};
	return (
		<Container>
			<TitleContainer>
				{image && <StakholderImage image={image} />}
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
		</Container>
	);
};

NodeInfo.propTypes = {
	subtitle: PropTypes.string,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	image: PropTypes.string,
	descriptionExpanded: PropTypes.bool.isRequired,
	toggleDescriptionExpansion: PropTypes.func.isRequired,
};

NodeInfo.defaultProps = {
	subtitle: undefined,
	description: undefined,
	image: undefined,
};

export default NodeInfo;
