import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/rootReducer";
import { useMemo } from "react";
import SearchBox from "../searchBox/SearchBox";
import { getContactById } from "../../store/contact/action";
import UserAvatarCircleIcon from "@atlaskit/icon/glyph/user-avatar-circle";
import style from "./ContactList.module.scss";
const ContactList = ({}) => {
	const navigate = useNavigate();
	const {
		list: { items: contacts },
	} = useSelector(({ contacts }: RootState) => contacts?.data);
	const gotoContactDetail = (id: number) => navigate(`/${id}`);
	const recentContact = useMemo(
		() => JSON.parse(localStorage.getItem("recent") || "[]"),
		[localStorage.getItem("recent")]
	);
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
		return recentContact?.map((item: any) => {
			return (
				<div
					className={style.contact}
					onClick={() => gotoContactDetail(Number(item.id))}
				>
					<div className={style.avatarItem}>
						{item?.avatar ? (
							<img className={style.avatar} src={item.avatar} />
						) : (
							<UserAvatarCircleIcon label="user" size="xlarge" />
						)}
					</div>
					<span>
						{item?.first_name} {item?.last_name}
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
				{recentContact?.length && (
					<>
						<div className={style.sectionTitle}>recent</div>
						<div>{renderRecentContact}</div>
						<div className={style.separator} />
					</>
				)}
				<div>{renderContactList}</div>
			</div>
			<div className={style.mainPageImage} />
		</div>
	);
};

export default ContactList;
