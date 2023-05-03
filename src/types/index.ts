export interface SearchBase {
	onFocus: () => void;
	onBlur: () => void;
	onChange: (searchText: string) => void;
	onFinished: () => void;
	overlayVisible: boolean;
	isSearchbarAtTop: boolean;
}

export interface Suggestion extends SearchBase {
	id: number;
	iscity: boolean;
	station_unique_name: string;
	local_name: string;
	city_id: number;
}

export interface City {
	unique_name: string;
}

export interface UseSearchResults extends SearchBase {
	suggestions: Suggestion[];
	isInputFocused: boolean;
	inputValue: string;
	cities: string[];
}

