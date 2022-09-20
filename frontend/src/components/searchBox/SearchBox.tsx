import { useState } from "react";
import { InputWrapper } from "../widgets";
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search'
import style from "./SearchBox.module.scss";

interface SearchBoxInterface {
	onChange: (e: any) => void;
}
const SearchBox = ({ onChange }: SearchBoxInterface) => {
	const [searchContent, setSearchContent] = useState<string>();
	const searchContentOnchange = (e: any) => {
		setSearchContent(e.target.value);
		onChange(e.target.value);
	};

	return (
		<div className={style.searchBoxContainer}>
			<InputWrapper
				placeholder="search"
				elemBeforeInput={
                    <EditorSearchIcon size="small" label="search" />
                  }
				value={searchContent}
				onChange={searchContentOnchange}
			/>
		</div>
	);
};

export default SearchBox;
