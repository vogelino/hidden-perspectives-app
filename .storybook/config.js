import { withInfo } from '@storybook/addon-info';
import { addDecorator, configure } from '@storybook/react';

addDecorator((getStory, context) => withInfo({ inline: true })(getStory)(context));

function loadStories() {
	require('../src/stories'); // eslint-disable-line global-require
}

configure(loadStories, module);
