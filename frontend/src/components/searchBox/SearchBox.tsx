import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { InputWrapper } from "../widgets";
import { searchContact } from "../../store/contact/action";
const _ = require("lodash");
const SearchBox = () => {
	const [searchContent, setSearchContent] = useState<string>();
	const dispatch = useDispatch();
	const search = (e: any) => {
		setSearchContent(e.target.value);
	};
	useEffect(() => {
		_.debounce(() => {
			let searchParams: string;
			if (Number(searchContent)) {
				searchParams = `\"phone\":{\"contains\":\"${searchContent}\"}`;
			} else {
				searchParams = `\"first_name\":{\"contains\":\"${searchContent}\"}`;
			}
			dispatch(searchContact(searchParams) as any);
		}, 1000);
	}, [searchContent]);
	return (
		<div>
			<InputWrapper value={searchContent} onChange={search} />
		</div>
	);
};

export default SearchBox;
