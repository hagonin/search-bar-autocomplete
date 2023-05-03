import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './searchBar.scss';
import SuggestionBox from '../SuggestionBox';

const DEBOUNCE_DELAY = 300;

export interface Suggestion {
	id: number;
	iscity: boolean;
	station_unique_name: string;
	local_name: string;
}

interface City {
	unique_name: string;
}

const SearchBar: React.FC = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const [showSuggestionBox, setShowSuggestionBox] = useState<boolean>(false);
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
		useState<number>(-1);
	const [cities, setCities] = useState<string[]>([]);

	let debounceTimeout: NodeJS.Timeout;

	useEffect(() => {
		const fetchSuggestions = async () => {
			if (!inputValue) {
				setSuggestions([]);
				return;
			}
			if (inputValue.length >= 2) {
				const response = await axios.get(
					`https://api.comparatrip.eu/cities/autocomplete/?q=${inputValue}`
				);
				const fetchedSuggestions = response.data;
				setSuggestions(fetchedSuggestions);
			}
		};
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(fetchSuggestions, DEBOUNCE_DELAY);
	}, [inputValue]);

	useEffect(() => {
		const fetchPopularCities = async () => {
			try {
				const response = await axios.get(
					'https://api.comparatrip.eu/cities/popular/5'
				);
				if (response.data && Array.isArray(response.data)) {
					const fetchedCities = response.data.map(
						(city: City) => city.unique_name
					);
					setCities(fetchedCities);
				}
			} catch (error) {
				console.error('Error fetching popular cities:', error);
			}
		};

		fetchPopularCities();
	}, []);

	const navigateToResultsPage = (query: string) => {
		// Implement the logic to navigate to the results page based on the selected suggestion
		window.location.href = `/search/results?query=${query}`;
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'ArrowDown') {
			setSelectedSuggestionIndex((prevIndex) =>
				prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
			);
		} else if (e.key === 'ArrowUp') {
			setSelectedSuggestionIndex((prevIndex) =>
				prevIndex > 0 ? prevIndex - 1 : prevIndex
			);
		} else if (e.key === 'Enter' && showSuggestionBox) {
			setInputValue(suggestions[selectedSuggestionIndex].local_name);
			setShowSuggestionBox(false);
			navigateToResultsPage(inputValue);
		}
	};

	const handleSearchButtonClick = () => {
		navigateToResultsPage(inputValue);
	};

	const handleSuggestionClick = async (suggestion: Suggestion) => {
		setInputValue(suggestion.local_name);
		setShowSuggestionBox(false);

		// Fetch popular cities from the selected city
		const response = await axios.get(
			`https://api.comparatrip.eu/cities/popular/from/${suggestion}/5`
		);
		const popularCitiesFromSelected = response.data;
		// Update suggestions with popular cities from the selected city
		setSuggestions(popularCitiesFromSelected);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		setShowSuggestionBox(e.target.value.length >= 1);
	};

	const handleFocus = () => {
		setShowSuggestionBox(true);
	};

	console.log(cities);
	return (
		<>
			<h4>Search bar autocomplete</h4>
			<div className="search-bar">
				<input
					type="text"
					value={inputValue}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={() => setShowSuggestionBox(false)}
					onKeyDown={handleKeyDown}
					aria-haspopup="listbox"
					aria-expanded={showSuggestionBox}
					aria-controls="suggestion-box"
					aria-label="Search"
				/>
				<button
					type="submit"
					onClick={handleSearchButtonClick}
					aria-label="Submit search"
				>
					<i className="icon-search"></i>
				</button>
				<SuggestionBox
					showSuggestionBox={showSuggestionBox}
					inputValueLength={inputValue.length}
					suggestions={suggestions}
					selectedSuggestionIndex={selectedSuggestionIndex}
					handleSuggestionClick={handleSuggestionClick}
					setShowSuggestionBox={setShowSuggestionBox}
					cities={cities}
				/>
			</div>
		</>
	);
};
export default SearchBar;
