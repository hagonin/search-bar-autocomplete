import React, { useState, useEffect } from 'react';

import SearchList from '../SearchList';
import './searchBar.scss';
import { useSearch } from '../../hooks/useSearch';

const SearchBar: React.FC = () => {
	const {
		onFocus,
		onBlur,
		onChange,
		onFinished,
		suggestions,
		isInputFocused,
		inputValue,
		cities,
	} = useSearch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onFinished();
	};
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			onFinished();
		}
	};

	console.log('suggestion in search bar', suggestions);
	return (
		<form className="search-bar" onSubmit={handleSubmit}>
			<input
				type="text"
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<button type="submit" aria-label="Submit search"></button>
			<SearchList
				suggestions={suggestions}
				isInputFocused={isInputFocused}
				inputValue={inputValue}
				cities={cities}
			/>
		</form>
	);
};
export default SearchBar;
