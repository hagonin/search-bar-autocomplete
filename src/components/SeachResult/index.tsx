import { useState } from 'react';
import { SearchResultProps } from '../../types';
import './searchResult.scss';

const SearchResult: React.FC<SearchResultProps> = ({ selectedSingleCity }) => {
	console.log('cities', selectedSingleCity);
	return (
		<div className="search-result">
			<p key={selectedSingleCity[0].city_id}>
				Here is potential cities depart from
				<span className="search-selected-city">
					{selectedSingleCity[0].unique_name}
				</span>
			</p>
			{/* <ul>
				{cities.map((city) => (
					<li key={city.id}>{city.local_name}</li> //
				))}
			</ul> */}
		</div>
	);
};

export default SearchResult;
