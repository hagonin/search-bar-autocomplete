import { SearchResultProps } from '../../types';

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
	return (
		<div>
			{result.map((city) => (
				<p key={city.city_id}>{city.local_name}</p>
			))}
		</div>
	);
};

export default SearchResult;
