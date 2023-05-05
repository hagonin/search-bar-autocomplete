import React, { useEffect, useRef } from 'react';

import SearchItem from '../SearchItem';
import './searchList.scss';
import { SearchListProps } from '../../types';
import { CloseBtnIcon, HandIcon } from '../../utils/icons';


const SearchList: React.FC<SearchListProps> = ({
	suggestions,
	isInputFocused,
	inputValue,
	popularCities,
	onCitySelected,
	onClose,
	highlightedIndex,
}) => {
	if (!isInputFocused) {
		return null;
	}

	if (inputValue.length < 2) {
		return (
			<div className="suggestions-container">
				<div className="inner-suggestions-container">
					<div className="header">
						<div className="hand-avatar">
							<HandIcon />
						</div>
						<div className="suggestion-words">
							<h5>Quelques examples que vous pouvez recherchez</h5>
							<div className="word-container">
								{popularCities.map((city, index) => (
									<span key={index} className="word">
										{city}
									</span>
								))}
							</div>
						</div>
						<button className="close-btn" onClick={onClose}>
							<CloseBtnIcon />
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="suggestions-container">
			<ul>
				{suggestions.map((suggestion, index) => (
					<SearchItem
						key={suggestion.city_id}
						suggestion={suggestion}
						onCitySelected={onCitySelected}
						isHighlighted={index === highlightedIndex}
					/>
				))}
			</ul>
		</div>
	);
};

export default SearchList;
