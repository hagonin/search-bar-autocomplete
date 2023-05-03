// useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	let debounceTimeout: NodeJS.Timeout;

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		debounceTimeout = handler;

		return () => {
			clearTimeout(debounceTimeout);
		};
	}, [value, delay]);

	return debouncedValue;
}

