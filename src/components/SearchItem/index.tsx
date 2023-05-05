import React from 'react';

import './searchItem.scss';
import { SearchItemProps } from '../../types';
import { CityIcon, StationIcon } from '../../utils/icons';

const SearchItem: React.FC<SearchItemProps> = ({
	suggestion,
	onCitySelected,
	isHighlighted,
	// onMouseOver,
}) => {
	return (
		<li
			className={`${isHighlighted ? ' highlighted' : ''}`}
			onClick={() => onCitySelected(suggestion)}
			// onMouseOver={onMouseOver}
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
