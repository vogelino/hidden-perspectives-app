import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { addDecorator, configure } from '@storybook/react';
import { globalStyle, createGlobalStyle } from '@smooth-ui/core-sc';

const GlobalStyle = createGlobalStyle`${globalStyle()}`;

addDecorator((getStory, context) => withInfo({
	header: false,
})(getStory)(context));

addDecorator((getStory) => (
	<div>
		<GlobalStyle />
		{getStory()}
	</div>
));

function loadStories() {
	require('../src/stories'); // eslint-disable-line global-require
}

configure(loadStories, module);
