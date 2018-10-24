import React from 'react';
import { Helmet } from 'react-helmet';

const title = 'Hidden Perspectives';
const description = 'A collaborative exploration tool for analysing the US-IRAN relashionships';
const OGURL = '';
const OGImage = '';

const Head = () => (
	<Helmet>
		<meta charSet="UTF-8" />
		<title>{title}</title>
		<meta
			name="description"
			content={description}
		/>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
		<link rel="apple-touch-icon" href="/static/touch-icon.png" />
		<link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
		<link rel="icon" href="/static/favicon.ico" />
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
	</Helmet>
);

export default Head;

