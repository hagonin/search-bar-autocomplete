import React from 'react';

import './searchItem.scss';
import { SearchItemProps } from '../../types';
import { CityIcon, StationIcon } from '../../utils/icons';

const SearchItem: React.FC<SearchItemProps> = ({
	suggestion,
	onCitySelected,
	isHighlighted,
}) => {
	return (
		<li
			className={`${isHighlighted ? ' highlighted' : ''}`}
			onClick={() => onCitySelected(suggestion)}
		>
			<span className="icon">
				{suggestion.iscity ? <CityIcon /> : <StationIcon />}
			</span>
			{suggestion.iscity
				? suggestion.local_name
				: suggestion.station_unique_name}
		</li>
	);
};

export default SearchItem;
