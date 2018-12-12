import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Head from '../Head';
import Theme from '../Theme';
import Home from '../../pages/home';
import Login from '../../pages/login';
import DocumentPage from '../../pages/document';
import EventPage from '../../pages/event';
import DocumentMetadataPage from '../../pages/documentMetadata';
import TranscriptPage from '../../pages/transcript';

const App = () => (
	<Router>
		<Theme>
			<div className="App">
				<Head />
				<Route exact path="/" component={Home} />
				<Route exact path="/document/context/:id" component={DocumentPage} />
				<Route exact path="/document/transcript/:id" component={TranscriptPage} />
				<Route exact path="/document/metadata/:id" component={DocumentMetadataPage} />
				<Route exact path="/document/metadata/:id/edit" component={() => null} />
				<Route exact path="/event/context/:id" component={EventPage} />
				<Route exact path="/event/metadata/:id" component={() => null} />
				<Route exact path="/event/metadata/:id/edit" component={() => null} />
				<Route exact path="/login" component={Login} />
			</div>
		</Theme>
	</Router>
);

export default App;
