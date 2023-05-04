import { useState } from 'react';

import {
	suggestionPopularCities,
	suggestionCities,
	fetchSuggestionCities,
} from '../services/apiService';
import { Suggestion, UseSearchResults, City, SearchResultItem } from '../types';

export const useSearch = (
	inputRef: React.RefObject<HTMLInputElement>
): UseSearchResults => {
	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [popularCities, setPopularCities] = useState<string[]>([]);
	const [overlayVisible, setOverlayVisible] = useState(false);
	const [isSearchbarAtTop, setIsSearchbarAtTop] = useState(false);

	const handleFocus = async () => {
		setOverlayVisible(true);
		setIsInputFocused(true);
		setIsSearchbarAtTop(true);

		const suggestionPopularCitites = await suggestionPopularCities();

		if (suggestionPopularCitites && Array.isArray(suggestionPopularCitites)) {
			const fetchedCities = suggestionPopularCitites.map(
				(city: City) => city.unique_name
			);
			setPopularCities(fetchedCities);
		}
	};

	const handleBlur = () => {
		setOverlayVisible(false);
		setIsInputFocused(false);
		setIsSearchbarAtTop(false);
		setInputValue('');
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const handleChange = async (searchText: string) => {
		setInputValue(searchText);
		if (searchText) {
			const newSuggestions = await suggestionCities(inputValue);
			setSuggestions(newSuggestions);
		} else {
			setSuggestions([]);
		}
	};

	const handleIntputFinished = async () => {
		const fetchDepartCity = await fetchSuggestionCities(inputValue);
		console.log('fetchDepartCity', fetchDepartCity);
	};

	return {
		onFocus: handleFocus,
		onBlur: handleBlur,
		onChange: handleChange,
		onFinished: handleIntputFinished,
		suggestions,
		isInputFocused,
		inputValue,
		popularCities,
		overlayVisible,
		isSearchbarAtTop,
	};
};
