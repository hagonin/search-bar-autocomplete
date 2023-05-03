import React, { useRef } from 'react';

import SearchList from '../SearchList';
import { useSearch } from '../../hooks/useSearch';
import { Suggestion } from '../../types';
import './searchBar.scss';

const SearchBar: React.FC = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const {
		onFocus,
		onBlur,
		onChange,
		onFinished,
		suggestions,
		isInputFocused,
		inputValue,
		popularCities,
		overlayVisible,
		isSearchbarAtTop,
	} = useSearch(inputRef);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onFinished();
	};

	const handleCitySelect = (selectedCitySuggestion: Suggestion)=>{
		onFinished();
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			onFinished();
		}
	};

	const handleOverlayClick = () => {
		onBlur();
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};
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
					onBlur={onBlur}
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
					onCitySelect={handleCitySelect}
				/>
			</form>
			<div
				className={`overlay ${overlayVisible ? ' visible' : ''}`}
				onClick={handleOverlayClick}
			></div>
		</>
	);
};
export default SearchBar;
