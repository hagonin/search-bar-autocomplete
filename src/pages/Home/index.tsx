
import React from 'react';
import './home.scss';
import SearchBar from '../../components/SearchBar';

const Home: React.FC = () => {
	return (
		<div className="home">
			<p>Recherchez vos voyages, trajets courts et bien plus encore...</p>
			<SearchBar />
		</div>
	);
};

export default Home;
