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
}

export interface UseSearchResults extends UseSearchProps {
	suggestions: Suggestion[];
	isInputFocused: boolean;
	inputValue: string;
	cities: string[];
}

