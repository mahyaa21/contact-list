import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/rootReducer";
import { useMemo } from "react";
import SearchBox from "../searchBox/SearchBox";
const ContactList = ({}) => {
    const recentContact = localStorage.getItem("recent");
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
	const renderRecentContact = useMemo(()=>{
 	    const recentContactIds = recentContact?.split(",");
         return recentContactIds?.map((item)=>{
            return <div>{contacts.find(i => i.id === Number(item))?.first_name}{" "}{contacts.find(i => i.id === Number(item))?.last_name}</div>;
         })
	}, [recentContact])
	return (
		<div>
			<SearchBox />
			<div>recent</div>
			<div>{renderRecentContact}</div>
			<hr/>
			<div>{renderContactList}</div>
		</div>
	);
};

export default ContactList;
