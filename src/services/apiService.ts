import axios from 'axios';

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const suggestionPopularCities = async () => {
	const response = await apiClient.get('/popular/5');
	return response.data;
};

export const suggestionCities = async (searchText: string) => {
	const response = await apiClient.get(`/autocomplete/?q=${searchText}`);
	return response.data;
};

export const fetchSuggestionCities = async (searchText: string) => {
	const response = await apiClient.get(`/popular/from/${searchText}/5`);
	return response.data;
};

export default {
	suggestionPopularCities,
	suggestionCities,
	fetchSuggestionCities,
};
