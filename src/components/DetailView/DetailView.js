import React from 'react';
import PropTypes from 'prop-types';
import { Container, Title } from './styles';
import LoadingIndicator from '../LoadingIndicator';
import { LoadingContainer } from '../LoadingIndicator/styles';

const DetailView = ({
	item,
	isLoading,
}) => (
	<Container>
		<LoadingContainer isLoading={isLoading}>
			<LoadingIndicator />
		</LoadingContainer>
		{item && <Title>{item.title}</Title>}
	</Container>
);

DetailView.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string.isRequired,
	}),
	isLoading: PropTypes.bool,
};

DetailView.defaultProps = {
	item: undefined,
	isLoading: true,
};

export default DetailView;
