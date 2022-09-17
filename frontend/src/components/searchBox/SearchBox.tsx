import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { InputWrapper } from "../widgets";
import { searchContact } from "../../store/contact/action";
import { throttle } from "lodash";
const SearchBox = () => {
	const [searchContent, setSearchContent] = useState<string>();
	const dispatch = useDispatch();
	const searchContentOnchange = (e: any) => {
		setSearchContent(e.target.value);
		search();
	};
	const search = throttle(() => {
		let searchParams: string;
		if (Number(searchContent)) {
			searchParams = `\"phone\":{\"contains\":\"${searchContent}\"}`;
		} else {
			searchParams = `\"first_name\":{\"contains\":\"${searchContent}\"}`;
		}
		dispatch(searchContact(searchParams) as any);
	}, 1000);

	return (
		<div>
			<InputWrapper value={searchContent} onChange={searchContentOnchange} />
		</div>
	);
};

export default SearchBox;
