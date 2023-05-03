import React, { useRef} from 'react';

import SearchList from '../SearchList';
import { useSearch } from '../../hooks/useSearch';
import './searchBar.scss';
import { Suggestion } from '../../types';

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
		cities,
		overlayVisible,
		isSearchbarAtTop,
	} = useSearch(inputRef);


	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onFinished();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			onFinished();
		}
	};

	const handleOverlayClick = () => {
		onBlur()
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}
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
					suggestions={suggestions as Suggestion[]}
					isInputFocused={isInputFocused}
					inputValue={inputValue}
					cities={cities}
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
