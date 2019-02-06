import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	@font-face {
		font-family: 'Suisse Intl';
		src: url('/fonts/suisseintl-regular-webfont.woff2') format('woff2'),
			url('/fonts/suisseintl-regular-webfont.woff') format('woff');
		font-weight: normal;
		font-style: normal;
		font-strech: normal;
	}

	@font-face {
		font-family: 'Suisse Intl';
		src: url('/fonts/suisseintl-semibold-webfont.woff2') format('woff2'),
			url('/fonts/suisseintl-semibold-webfont.woff') format('woff');
		font-weight: bold;
		font-style: normal;
		font-strech: normal;
	}

	@font-face {
		font-family: 'Suisse Intl';
		src: url('/fonts/suisseintlcond-regular-webfont.woff2') format('woff2'),
			url('/fonts/suisseintlcond-regular-webfont.woff') format('woff');
		font-weight: normal;
		font-style: normal;
		font-stretch: condensed;

	}

	@font-face {
		font-family: 'Suisse Intl Mono';
		src: url('/fonts/suisseintlmono-regular-webfont.woff2') format('woff2'),
			url('/fonts/suisseintlmono-regular-webfont.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}

	::selection {
		background: ${({ theme }) => theme.primaryLight};
		color: ${({ theme }) => theme.primaryDark};
	}
	::-moz-selection {
		background: ${({ theme }) => theme.primaryLight};
		color: ${({ theme }) => theme.primaryDark};
	}

	html {
		font-size: 100%;
		overflow: hidden;
	}

	body {
		font-size: 16px;
		font-size: 1rem;
		margin-top: 4.5rem;
	}

	* {
		box-sizing: border-box;
		font-family: ${({ theme }) => theme.fontFamily};
		-webkit-font-smoothing: antialiased;
		font-stretch: normal;
		letter-spacing: .01em;
	}

	#root {
		min-height: calc(100vh - 4.5rem);
		position: relative;
	}

`;
