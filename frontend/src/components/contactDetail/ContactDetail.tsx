import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/rootReducer";
import style from "./ContactDetail.module.scss";
import UserAvatarCircleIcon from "@atlaskit/icon/glyph/user-avatar-circle";
import CommentIcon from "@atlaskit/icon/glyph/comment";
import EmailIcon from "@atlaskit/icon/glyph/email";
import HipchatDialOutIcon from "@atlaskit/icon/glyph/hipchat/dial-out";
import { getContactById } from "../../store/contact/action";
import Utils from "../../lib/utils";
const ContactDetail = () => {
	const params = useParams();
	const dispatch = useDispatch<any>();
	const { id } = params;
	const contacts = useSelector(
		({ contacts }: RootState) => contacts?.data.list?.items
	);
	const selectedContact = useMemo(
		() => contacts.find((user) => user?.id === Number(id)),
		[contacts, id]
	);
	
	useEffect(()=>{
		if(!selectedContact && id){
			dispatch(getContactById(id))
		}
	}, [id]);

	useEffect(() => {
		if (id) {
			let recentUsers: Array<any> = JSON.parse(
				localStorage.getItem("recent") || "[]"
			);
			recentUsers = Utils.uniqueArray([...recentUsers, selectedContact]).slice(-4);
			localStorage.setItem("recent", JSON.stringify([...recentUsers]));
		}
	}, [id]);

	const sectionGenerator = (title: string, item: any) => (
		<div className={style.sectionContainer}>
			<div className={style.title}>{title}</div>
			<div className={style.item}>{item ?? "empty"}</div>
		</div>
	);
	const actions = () => (
		<div className={style.actionWrapper}>
			<div className={style.comment}>
				<CommentIcon label="text" />
			</div>
			<div className={style.email}>
				<EmailIcon label="email" />
			</div>
			<a className={style.dial} href={`tel:${selectedContact?.phone}`}>
				<HipchatDialOutIcon label="dial" />
			</a>
		</div>
	);
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
				<span className={style.fullName}>
					{selectedContact?.first_name} {selectedContact?.last_name}
				</span>
				<span className={style.phone}>{selectedContact?.phone}</span>
				{actions()}
				<div className={style.detailInfo}>
					{sectionGenerator("Email", selectedContact?.email)}
					{sectionGenerator("Address", selectedContact?.address)}
					{sectionGenerator("Telegram", selectedContact?.telegram)}
					{sectionGenerator("Gender", selectedContact?.gender)}
					{sectionGenerator("Company", selectedContact?.company)}
					{sectionGenerator("Note", selectedContact?.note)}
				</div>
			</div>
		</div>
	);
};

export default ContactDetail;
