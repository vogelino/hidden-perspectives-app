import { configure } from '@storybook/react';

function loadStories() {
	require('../src/stories'); // eslint-disable-line global-require
}

configure(loadStories, module);

