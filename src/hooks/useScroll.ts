import { useEffect, useRef } from "react";
import { UseScrollProps } from "../types";

export const useScroll = ({ highlightedIndex, ITEM_HEIGHT }: UseScrollProps) => {
	const listCitiesRef = useRef<HTMLUListElement | null>(null);

	useEffect(() => {
		if (listCitiesRef.current) {
			const scrollTop = listCitiesRef.current.scrollTop;
			const offsetTop = highlightedIndex * ITEM_HEIGHT;

			if (
				offsetTop < scrollTop ||
				offsetTop + ITEM_HEIGHT > scrollTop + listCitiesRef.current.clientHeight
			) {
				listCitiesRef.current.scrollTop = offsetTop;
			}
		}
	}, [highlightedIndex, ITEM_HEIGHT]);

	return listCitiesRef;
};
