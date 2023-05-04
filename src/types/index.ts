
export interface Suggestion {
	id: number;
	iscity: boolean;
	station_unique_name: string;
	local_name: string;
	city_id: number;
}

export interface City {
	unique_name: string;
}

export interface SearchResultItem {
	id: number;
	local_name: string;
	unique_name: string;
	city_id: number;
}

export interface UseSearchProps {
	onFocus: () => void;
	onBlur: () => void;
	onChange: (searchText: string) => void;
	onFinished: (selectedCity?: SearchResultItem) => void;
	overlayVisible: boolean;
	isSearchbarAtTop: boolean;
}

export interface SearchListProps
	extends Omit<
		UseSearchResults,
		'onFocus' | 'onBlur' | 'onChange' | 'onFinished'
	> {
	suggestions: Suggestion[];
	onCitySelected: (result: SearchResultItem) => void;
}

export interface UseSearchResults extends UseSearchProps {
	suggestions: Suggestion[];
	isInputFocused: boolean;
	inputValue: string;
	popularCities: string[];
}

export interface SearchItemProps {
	suggestion: Suggestion;
	onCitySelected: (result: SearchResultItem) => void;
}

export interface SearchResultProps {
	result : SearchResultItem[];
}