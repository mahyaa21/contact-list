import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/rootReducer";
import { useEffect, useMemo } from "react";
import SearchBox from "../searchBox/SearchBox";
import { getContactById } from "../../store/contact/action";
import UserAvatarCircleIcon from "@atlaskit/icon/glyph/user-avatar-circle";
import style from "./ContactList.module.scss";
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
	}, []);
	const gotoContactDetail = (id: number) => navigate(`/${id}`);
	const renderContactList = useMemo(() => {
		return contacts.map((item) => (
			<div
				className={style.contact}
				key={item.id}
				onClick={() => gotoContactDetail(item.id)}
			>
				<div className={style.avatarItem}>
					{item?.avatar ? (
						<img className={style.avatar} src={item.avatar} />
					) : (
						<UserAvatarCircleIcon label="user" size="xlarge" />
					)}
				</div>
				<span>
					{item.first_name} {item.last_name}
				</span>
			</div>
		));
	}, [contacts, contacts.length]);
	const renderRecentContact = useMemo(() => {
		return recentContact?.map((item) => {
			return (
				<div
					className={style.contact}
					onClick={() => gotoContactDetail(Number(item))}
				>
					<div className={style.avatarItem}>
						<img
							className={style.avatar}
							src={contacts.find((i) => i.id === Number(item))?.avatar}
						/>
					</div>
					<span>
						{contacts.find((i) => i.id === Number(item))?.first_name}{" "}
						{contacts.find((i) => i.id === Number(item))?.last_name}
					</span>
				</div>
			);
		});
	}, [recentContact]);

	return (
		<div className={style.contactListContainer}>
			<div className={style.contactListWrapper}>
				<div className={style.title}>Contact List</div>
				<SearchBox />
				<div className={style.sectionTitle}>recent</div>
				<div>{renderRecentContact}</div>
				<div className={style.separator} />
				<div>{renderContactList}</div>
			</div>
			<div className={style.mainPageImage} />
		</div>
	);
};

export default ContactList;
