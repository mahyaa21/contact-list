import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/rootReducer";
import { useEffect, useMemo } from "react";
import SearchBox from "../searchBox/SearchBox";
import { getContactById } from "../../store/contact/action";
const ContactList = ({}) => {
	const recentContact = localStorage.getItem("recent")?.split(",");
	const navigate = useNavigate();
	const dispatch = useDispatch<any>();
	const contacts = useSelector(
		({ contacts }: RootState) => contacts?.data.list?.items
	);
	useEffect(() => {
		const currentContact = contacts.map((item) => item.id);
		console.log(currentContact, recentContact);
		recentContact?.forEach((id) => {
			if (!currentContact.includes(Number(id))) {
				dispatch(getContactById(id));
			}
		});
	}, [contacts, recentContact]);
	const gotoContactDetail = (id: number) => navigate(`/${id}`);
	const renderContactList = useMemo(() => {
		return contacts.map((item) => (
			<div key={item.id} onClick={() => gotoContactDetail(item.id)}>
				{item.first_name} {item.last_name}
			</div>
		));
	}, [contacts]);
	const renderRecentContact = useMemo(() => {
		return recentContact?.map((item) => {
			return (
				<div onClick={() => gotoContactDetail(Number(item))}>
					{contacts.find((i) => i.id === Number(item))?.first_name}{" "}
					{contacts.find((i) => i.id === Number(item))?.last_name}
				</div>
			);
		});
	}, [recentContact]);
	return (
		<div>
			<SearchBox />
			<div>recent</div>
			<div>{renderRecentContact}</div>
			<hr />
			<div>{renderContactList}</div>
		</div>
	);
};

export default ContactList;
