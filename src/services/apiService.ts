import axios from 'axios';

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const suggestionPopularCities = async () => {
	try {
		const response = await apiClient.get('/popular/5');
		return response.data;
	} catch (error) {
		console.error('Error fetching popular cities:', error);
		return [];
	}
};

export const suggestionCities = async (searchText: string) => {
	try {
		const response = await apiClient.get(
			`/autocomplete/?q=${encodeURIComponent(searchText)}`
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching cities:', error);
		return [];
	}
};

export const fetchSuggestionCities = async (searchText: string) => {
	try {
		const response = await apiClient.get(
			`/popular/from/${encodeURIComponent(searchText)}/5`
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching cities from selected city:', error);
		return [];
	}
};

export default {
	suggestionPopularCities,
	suggestionCities,
	fetchSuggestionCities,
};
