import { SearchResultProps } from '../../types';

const SearchResult: React.FC<SearchResultProps> = ({
	selectedSingleCity,
}) => {
	console.log('res', selectedSingleCity);
	return (
		<div className="search-result">
			{selectedSingleCity.map((city) => (
				<p key={city.city_id}>{city.local_name}</p>
			))}
		</div>
	);
};

export default SearchResult;
