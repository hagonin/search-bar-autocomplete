import { useEffect, useState } from 'react';

import {
	suggestionPopularCities,
	suggestionCities,
	fetchSuggestionCities,
} from '../services/apiService';
import { SearchResultItem, Suggestion, UseSearchResults } from '../types';

export const useSearch = (
	inputRef: React.RefObject<HTMLInputElement>
): UseSearchResults => {
	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [popularCities, setPopularCities] = useState<string[]>([]);
	const [overlayVisible, setOverlayVisible] = useState(false);
	const [isSearchbarAtTop, setIsSearchbarAtTop] = useState(false);

	const handleSearchFocus = async () => {
		setOverlayVisible(true);
		setIsInputFocused(true);
		setIsSearchbarAtTop(true);

		const popularCitySuggestions = await suggestionPopularCities();

		if (popularCitySuggestions && Array.isArray(popularCitySuggestions)) {
			const fetchedCities = popularCitySuggestions.map(
				(city: Suggestion) => city.unique_name
			);
			setPopularCities(fetchedCities);
		}
	};

	const handleSearchBlur = (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		if (
			!target.closest('.search-bar') &&
			!target.closest('.suggestions-container')
		) {
			setOverlayVisible(false);
			setIsInputFocused(false);
			setIsSearchbarAtTop(false);
			setInputValue('');
			if (inputRef.current) {
				inputRef.current.value = '';
			}
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleSearchBlur);

		return () => {
			document.removeEventListener('mousedown', handleSearchBlur);
		};
	}, []);

	const handleSearchChange = async (searchText: string) => {
		setInputValue(searchText);
		if (searchText) {
			const newSuggestions = await suggestionCities(searchText);
			setSuggestions(newSuggestions);
		} else {
			setSuggestions([]);
		}
	};

	const handleIntputFinished = async () => {
		const fetchDepartCity = await fetchSuggestionCities(inputValue);
		console.log('fetchDepartCity', fetchDepartCity);
	};

	const handleCloseButton = () => {
		setIsInputFocused(false)
	}

	return {
		onFocus: handleSearchFocus,
		onBlur: handleSearchBlur,
		onChange: handleSearchChange,
		onFinished: handleIntputFinished,
		onClose: handleCloseButton,
		suggestions,
		isInputFocused,
		inputValue,
		popularCities,
		overlayVisible,
		isSearchbarAtTop,
	};
};
