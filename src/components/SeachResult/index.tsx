import { SearchResultProps } from '../../types';
import './searchResult.scss';

const SearchResult: React.FC<SearchResultProps> = ({
	selectedSingleCity,
	departCities,
}) => {
	return (
		<div className="search-result">
			<p>Les villes potentielles au départ de</p>
			<p className="search-selected-city">
				{selectedSingleCity[0].unique_name}
			</p>
			<ul className="search-list-city">
				{departCities.map((city) => (
					<li key={city.id}>{city.local_name}</li> //
				))}
			</ul>
		</div>
	);
};

export default SearchResult;
