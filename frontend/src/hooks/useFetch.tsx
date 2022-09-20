import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchContact } from "../store/contact/action";
import { RootState } from "../store/rootReducer";

interface UseFetchInterface {
	query: string;
	page: number;
}
function useFetch({ query, page }: UseFetchInterface) {
	const dispatch = useDispatch<any>();
	const {
		loading,
		error,
		data: {
			list: { items: contacts },
		},
	} = useSelector(({ contacts }: RootState) => contacts);
	const sendQuery = useCallback(
		async (query: string) => {
            let searchParams: string;
            if (Number(query)) {
                searchParams = `\"phone\":{\"contains\":\"${query}\"}`;
            } else if(query) {
                searchParams = `\"first_name\":{\"contains\":\"${query}\"},\"last_name\":{\"contains\":\"${query}\"}`;
            } else {
                searchParams = ""
            }
			await dispatch(searchContact(searchParams, page * 10));
		},
		[query, page]
	);

	useEffect(() => {
		sendQuery(query);
	}, [query, sendQuery, page]);

	return { loading, error, contacts };
}

export default useFetch;
