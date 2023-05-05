import React, { useRef, useState } from 'react';

import SearchList from '../SearchList';
import { useSearch } from '../../hooks/useSearch';
import { SearchResultItem } from '../../types';
import './searchBar.scss';
import SearchResult from '../SeachResult';

const SearchBar: React.FC = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const {
		onFocus,
		onChange,
		onFinished,
		onClose,
		suggestions,
		isInputFocused,
		inputValue,
		popularCities,
		overlayVisible,
		isSearchbarAtTop,
	} = useSearch(inputRef);

	const [selectedCity, setSelectedCity] = useState<SearchResultItem[]>([]);
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onFinished();
	};

	const handleCitySelect = (selectedSingleCity: SearchResultItem): void => {
		onFinished(selectedSingleCity);
		setSelectedCity([selectedSingleCity]);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			setHighlightedIndex((prevIndex) =>
				Math.min(prevIndex + 1, suggestions.length - 1)
			);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
				handleCitySelect(suggestions[highlightedIndex]);
			} else {
				onFinished();
			}
		}
	};

	const handleOverlayClick = () => {
		inputRef.current?.focus();
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
					{...{
						suggestions,
						isInputFocused,
						inputValue,
						popularCities,
						overlayVisible,
						isSearchbarAtTop,
						onCitySelected: handleCitySelect,
						onClose,
						highlightedIndex,
						setHighlightedIndex,
					}}
				/>
			</form>
			<div
				className={`overlay ${overlayVisible ? ' visible' : ''}`}
				onClick={handleOverlayClick}
			></div>
			{selectedCity.length > 0 && (
				<SearchResult selectedSingleCity={selectedCity} />
			)}
		</>
	);
};
export default SearchBar;
