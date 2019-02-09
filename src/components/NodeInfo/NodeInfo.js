import React from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Title,
	Subtitle,
	Description,
	DescriptionLimitGradient,
	ShowMoreText,
} from './styles';

const NodeInfo = ({
	subtitle,
	title,
	description,
	descriptionExpanded,
	toggleDescriptionExpansion,
}) => (
	<Container>
		{subtitle && (
			<Subtitle variant="h6">{subtitle}</Subtitle>
		)}
		<Title variant="h4">{title}</Title>
		{description && (
			<Description
				onClick={() => toggleDescriptionExpansion(!descriptionExpanded)}
				expanded={descriptionExpanded}
			>
				{description}
				<DescriptionLimitGradient />
				<ShowMoreText>Show more</ShowMoreText>
			</Description>
		)}
	</Container>
);

NodeInfo.propTypes = {
	subtitle: PropTypes.string,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	descriptionExpanded: PropTypes.bool.isRequired,
	toggleDescriptionExpansion: PropTypes.func.isRequired,
};

NodeInfo.defaultProps = {
	subtitle: undefined,
	description: undefined,
};

export default NodeInfo;
