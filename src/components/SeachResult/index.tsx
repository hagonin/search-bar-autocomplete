import { SearchResultProps } from '../../types';
import './searchResult.scss';

const SearchResult: React.FC<SearchResultProps> = ({
	selectedSingleCity,
	departCities,
}) => {
	console.log('selectedSingleCity', selectedSingleCity);
	return (
		<div className="search-result">
			<p>Les villes potentielles au départ de</p>
			<p className="search-selected-city">
				{selectedSingleCity[0].unique_name}
			</p>
			<ul>
				{departCities.map((city) => (
					<li key={city.id}>{city.local_name}</li> //
				))}
			</ul>
		</div>
	);
};

export default SearchResult;
