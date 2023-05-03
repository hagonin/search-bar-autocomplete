
import React from 'react';
import './home.scss';
import SearchBar from '../../components/SearchBar';

const Home: React.FC = () => {
	return (
		<div className="home">
			<h1>Recherchez vos voyages, trajets courts et bien plus encore...</h1>
			<SearchBar />
		</div>
	);
};

export default Home;
