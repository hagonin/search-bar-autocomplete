
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

export interface UseSearchProps {
	onFocus: () => void;
	onBlur: () => void;
	onChange: (searchText: string) => void;
	onFinished: () => void;
	overlayVisible: boolean;
	isSearchbarAtTop:boolean;
}

export interface UseSearchResults extends UseSearchProps {
	suggestions: Suggestion[];
	isInputFocused: boolean;
	inputValue: string;
	popularCities: string[];
}

export interface SearchListProps
	extends Omit<
		UseSearchResults,
		'onFocus' | 'onBlur' | 'onChange' | 'onFinished'
	> {
	suggestions: Suggestion[];
	onCitySelect: (suggestion: Suggestion) => void;
}

export interface SearchItemProps {
	suggestion: Suggestion;
	onCitySelect: (suggestion: Suggestion) => void;
}

