import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Theme from '../components/Theme';
import '../index.css';
import '../fonts.css';

const StoryWrapperContent = styled.div`
	width: 100%;
	max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : '640px')};
	margin: 40px auto;
	padding: 40px;
	border: 1px solid #dee2e6;
	border-radius: 5px;
`;

const StoryWrapperContainer = styled.div`
	width: 100vw;
	min-height: 100vh;
	position: relative;
`;

export const StoryWrapper = ({ children, maxWidth }) => (
	<Theme>
		<StoryWrapperContainer>
			<StoryWrapperContent maxWidth={maxWidth}>
				{children}
			</StoryWrapperContent>
		</StoryWrapperContainer>
	</Theme>
);

StoryWrapper.propTypes = {
	children: PropTypes.element.isRequired,
	maxWidth: PropTypes.number,
};

StoryWrapper.defaultProps = {
	maxWidth: undefined,
};

