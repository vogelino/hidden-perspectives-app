import React from 'react';
import { Helmet } from 'react-helmet';

const title = 'Hidden Perspectives';
const description = 'A collaborative exploration tool for analysing the US-IRAN relashionships';
const OGURL = '';
const OGImage = '';
const metaColor = '#ffffff';
const safariPinnedTabColor = '#5bbad5';

const Head = () => (
	<Helmet>
		<meta charSet="UTF-8" />
		<title>{title}</title>
		<meta
			name="description"
			content={description}
		/>
		<meta name="viewport" content="width=device-width, initial-scale=1" />

		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
		<link rel="mask-icon" href="/safari-pinned-tab.svg" color={safariPinnedTabColor} />
		<link rel="manifest" href="/manifest.json" />
		<meta name="msapplication-TileColor" content={metaColor} />
		<meta name="theme-color" content={metaColor} />

		<meta property="og:url" content={OGURL} />
		<meta property="og:title" content={title} />
		<meta
			property="og:description"
			content={description}
		/>
		<meta name="twitter:site" content={OGURL} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:image" content={OGImage} />
		<meta property="og:image" content={OGImage} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<link rel="stylesheet" href="/fonts/fonts.css" />
	</Helmet>
);

export default Head;

