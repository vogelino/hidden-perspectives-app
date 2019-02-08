import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Theme from '../components/Theme';
import { GlobalStyles } from '../components/App/styles';

const StoryWrapperContent = styled.div`
	width: 100%;
	max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : '370px')};
	margin: 40px auto;
	padding: 40px;
	border: 1px solid #dee2e6;
	border-radius: 5px;
	background: ${({ background }) => background};
`;

const StoryWrapperContainer = styled.div`
	width: 100vw;
	min-height: 100vh;
	position: relative;
`;

export const StoryWrapper = ({ children, maxWidth, background }) => (
	<Theme>
		<StoryWrapperContainer>
			<GlobalStyles />
			<StoryWrapperContent
				maxWidth={maxWidth}
				background={background}
			>
				{children}
			</StoryWrapperContent>
		</StoryWrapperContainer>
	</Theme>
);

StoryWrapper.propTypes = {
	children: PropTypes.element.isRequired,
	maxWidth: PropTypes.number,
	background: PropTypes.string,
};

StoryWrapper.defaultProps = {
	maxWidth: undefined,
	background: 'none',
};

