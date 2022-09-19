import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import style from "./ContactDetail.module.scss";
import UserAvatarCircleIcon from "@atlaskit/icon/glyph/user-avatar-circle";
import CommentIcon from '@atlaskit/icon/glyph/comment';
import EmailIcon from '@atlaskit/icon/glyph/email';
import HipchatDialOutIcon from '@atlaskit/icon/glyph/hipchat/dial-out';

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

	useEffect(() => {
		const recentContacts = localStorage.getItem("recent") || "";
		const recentContactIds = recentContacts?.split(",");
		if (id && !recentContactIds?.includes(id) && recentContactIds?.length < 4) {
			const newRecentContact = [...recentContactIds, selectedContact?.id];
			localStorage.setItem("recent", newRecentContact.join(","));
		} else if (
			id &&
			!recentContactIds?.includes(id) &&
			recentContactIds?.length >= 4
		) {
			recentContactIds?.pop();
			recentContactIds?.unshift(`${selectedContact?.id}`);
			localStorage.setItem("recent", recentContactIds.join(","));
		}
	}, [id]);
	const sectionGenerator = (title: string, item: any) => (
		<div className={style.sectionContainer}>
			<div className={style.title}>{title}</div>
			<div className={style.item}>{item ?? "empty"}</div>
		</div>
	);
	const actions = () => <div className={style.actionWrapper}>
		<div className={style.comment}><CommentIcon label="text"/></div>
		<div className={style.email}><EmailIcon label="email"/></div>
		<div className={style.dial}><HipchatDialOutIcon label="dial"/></div>
	</div>
	return (
		<div className={style.contactDetailContainer}>
			<div className={style.contactDetailWrapper}>
				<div className={style.avatarItem}>
					{selectedContact?.avatar ? (
						<img className={style.avatar} src={selectedContact.avatar} />
					) : (
						<UserAvatarCircleIcon label="user" />
					)}
				</div>
				<span className={style.fullName}>{selectedContact?.first_name}{" "}{selectedContact?.last_name}</span>
				<span className={style.phone}>{selectedContact?.phone}</span>
				{actions()}
				<div className={style.detailInfo}>	
					{sectionGenerator("Email",selectedContact?.email)}
					{sectionGenerator("Address",selectedContact?.address)}
					{sectionGenerator("Telegram",selectedContact?.telegram)}
					{sectionGenerator("Note",selectedContact?.note)}
				</div>
			</div>
		</div>
	);
};

export default ContactDetail;
