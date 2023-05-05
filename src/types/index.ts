export interface Suggestion {
	id: number;
	iscity: boolean;
	station_unique_name: string;
	local_name: string;
	city_id: number;
	unique_name: string;
	departCities: string[];
}

export interface SearchResultItem {
	id: number;
	local_name: string;
	unique_name: string;
	city_id: number;
	departCities: string[];
}

export interface UseSearchResults {
	onFocus: () => void;
	onBlur: (event: MouseEvent) => void;
	onChange: (searchText: string) => void;
	onFinished: (selectedCity?: SearchResultItem) => Promise<void>;
	onClose: () => void;
	suggestions: Suggestion[];
	isInputFocused: boolean;
	inputValue: string;
	popularCities: string[];
	overlayVisible: boolean;
	isSearchbarAtTop: boolean;
	departCities: SearchResultItem[];
}

export interface SearchListProps
	extends Omit<
		UseSearchResults,
		'onFocus' | 'onBlur' | 'onChange' | 'onFinished'
	> {
	suggestions: Suggestion[];
	onCitySelected: (result: SearchResultItem) => void;
	highlightedIndex: number;
	setHighlightedIndex: (index: number) => void;
}

export interface SearchItemProps {
	suggestion: Suggestion;
	onCitySelected: (suggestion: Suggestion) => void;
	isHighlighted: boolean;
}

export interface SearchResultProps {
	selectedSingleCity: SearchResultItem[];
	departCities: SearchResultItem[];
}
