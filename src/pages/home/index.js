import React from 'react';
import MainTimeline from '../../components/MainTimeline';
import Search from '../../components/Search';
import Header from '../../components/Header';

const Home = () => (
	<>
		<Header><Search /></Header>
		<MainTimeline />
	</>
);

export default Home;

