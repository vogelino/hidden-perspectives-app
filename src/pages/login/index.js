import React from 'react';
import Login from '../../components/Login';
import Search from '../../components/Search';
import Header from '../../components/Header';

const Home = () => (
	<div className="Home">
		<Header>
			<Search />
		</Header>
		<Login />
	</div>
);

export default Home;

