import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Theme from '../components/Theme';
import '../index.css';
import '../fonts.css';

const StoryWrapperContent = styled.div`
	min-width: 400px;
	max-width: 640px;
	margin: 40px auto;
	padding: 40px;
	border: 1px solid #dee2e6;
	border-radius: 5px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

const StoryWrapperContainer = styled.div`
	width: 100vw;
	height: 100vh;
	position: relative;
`;

export const StoryWrapper = ({ children }) => (
	<Theme>
		<StoryWrapperContainer>
			<StoryWrapperContent>
				{children}
			</StoryWrapperContent>
		</StoryWrapperContainer>
	</Theme>
);

StoryWrapper.propTypes = {
	children: PropTypes.element.isRequired,
};

