import { SearchResultProps } from '../../types';

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				{result.map((city) => (
					<tr key={city.id}>
						<td>{city.id}</td>
						<td>{city.local_name}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default SearchResult;
