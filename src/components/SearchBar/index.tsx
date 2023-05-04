import React, { useRef, useState } from 'react';

import SearchList from '../SearchList';
import { useSearch } from '../../hooks/useSearch';
import { SearchResultItem } from '../../types';
import './searchBar.scss';
import SearchResult from '../SeachResult';
import { MouseEventHandler } from 'react';

const SearchBar: React.FC = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const {
		onFocus,
		onChange,
		onFinished,
		suggestions,
		isInputFocused,
		inputValue,
		popularCities,
		overlayVisible,
		isSearchbarAtTop,
		onClose
	} = useSearch(inputRef);

	const [selectedCity, setSelectedCity] = useState<SearchResultItem[]>([]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onFinished();
	};

	const handleCitySelect = (result: SearchResultItem):void => {
		onFinished(result);
		setSelectedCity((prevSelectedCity) => [...prevSelectedCity, result]);
		console.log('result',result);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const selectedSuggestion = suggestions.find(
				(suggestion) => suggestion.local_name === e.currentTarget.value
			);

			if (selectedSuggestion) {
				const result: SearchResultItem = {
					id: selectedSuggestion.id,
					local_name: selectedSuggestion.local_name,
					unique_name: selectedSuggestion.station_unique_name,
					city_id: selectedSuggestion.city_id,
				};

				handleCitySelect(result);
			} else {
				onFinished();
			}
		}
	};


	const handleOverlayClick = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	console.log('selectedCity', selectedCity);
	return (
		<>
			<form
				className={`search-bar ${isSearchbarAtTop ? 'at-top' : ''}`}
				onSubmit={handleSubmit}
			>
				<input
					ref={inputRef}
					type="text"
					onFocus={onFocus}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Une destination, demande..."
				/>
				<button type="submit" aria-label="Submit search"></button>
				<SearchList
					suggestions={suggestions}
					isInputFocused={isInputFocused}
					inputValue={inputValue}
					popularCities={popularCities}
					overlayVisible={false}
					isSearchbarAtTop={false}
					onCitySelected={handleCitySelect}
					onClose={onClose}
				/>
			</form>
			<div
				className={`overlay ${overlayVisible ? ' visible' : ''}`}
				onClick={handleOverlayClick}
			></div>
			{selectedCity && <SearchResult result={selectedCity} />}
		</>
	);
};
export default SearchBar;
