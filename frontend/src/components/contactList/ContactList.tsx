import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/rootReducer";
import { useMemo } from "react";
import SearchBox from "../searchBox/SearchBox";
const ContactList = ({}) => {
	const navigate = useNavigate();
	const contacts = useSelector(
		({ contacts }: RootState) => contacts?.data.list?.items
	);
	const gotoContactDetail = (id: number) => navigate(`/${id}`);
	const renderContactList = useMemo(() => {
		return contacts.map((item) => (
			<div key={item.id} onClick={() => gotoContactDetail(item.id)}>
				{item.first_name} {item.last_name}
			</div>
		));
	}, [contacts]);
	return (
		<div>
			<SearchBox />
			{renderContactList}
		</div>
	);
};

export default ContactList;
