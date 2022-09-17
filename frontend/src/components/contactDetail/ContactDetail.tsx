import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useEffect, useMemo } from "react";
const ContactDetail = () => {
	const params = useParams();
	const { id } = params;
	const contacts = useSelector(
		({ contacts }: RootState) => contacts?.data.list?.items
	);
	const selectedContact = useMemo(
		() => contacts.find((user) => user.id === Number(id)),
		[contacts, id]
	);
	
    useEffect(()=>{
        const recentContacts = localStorage.getItem("recent") || "";
        const recentContactIds = recentContacts?.split(",");
        if(id && !recentContactIds?.includes(id) && recentContactIds?.length < 4){
            const newRecentContact = [...recentContactIds, selectedContact?.id]
            localStorage.setItem("recent", newRecentContact.join(","));
        } else if (id && !recentContactIds?.includes(id) && recentContactIds?.length >= 4){
            recentContactIds?.pop();
            recentContactIds?.unshift(`${selectedContact?.id}`);
            localStorage.setItem("recent", recentContactIds.join(","));
        }
    }, [id])
	return (
		<div>
		    <img src={selectedContact?.avatar} width={100} height={100}/>
			<span>{selectedContact?.first_name}</span>
			<span>{selectedContact?.last_name}</span>
			<span>{selectedContact?.phone}</span>
			<span>{selectedContact?.email}</span>
		</div>
	);
};

export default ContactDetail;
