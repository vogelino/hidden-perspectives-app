import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';

setDefaults({
	header: false,
});

function loadStories() {
	require('../src/stories'); // eslint-disable-line global-require
}

configure(loadStories, module);

