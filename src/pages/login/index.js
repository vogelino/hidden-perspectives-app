import React from 'react';
import Login from '../../components/Login';
import Search from '../../components/Search';
import Header from '../../components/Header';

const Home = (props) => (
	<>
		<Header>
			<Search />
		</Header>
		<Login {...props} />
	</>
);

export default Home;

