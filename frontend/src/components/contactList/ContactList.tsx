import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "../searchBox/SearchBox";
import useFetch from "../../hooks/useFetch";
import UserAvatarCircleIcon from "@atlaskit/icon/glyph/user-avatar-circle";
import style from "./ContactList.module.scss";
import { ContactInterface } from "../../interfaces/contact.interface";
const ContactList = ({}) => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const { loading, error, contacts } = useFetch({ query, page });
	const loader = useRef(null);

	const handleObserver = useCallback((entries: Array<any>) => {
		const target = entries[0];
		if (target.isIntersecting) {
			setPage((prev) => prev + 1);
		}
	}, []);

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: "20px",
			threshold: 0,
		};
		const observer = new IntersectionObserver(handleObserver, option);
		if (loader.current) observer.observe(loader.current);
	}, [handleObserver]);

	const gotoContactDetail = (id: number) => navigate(`/${id}`);

	const recentContact = useMemo(
		() => JSON.parse(localStorage.getItem("recent") || "[]"),
		[localStorage.getItem("recent")]
	);

	function renderContact(array: Array<ContactInterface>) {
		return array.map((item) => (
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
				<div>
					<div className={style.name}>
						{item.first_name} {item.last_name}
					</div>
					<div className={style.phoneNumber}>{item.phone}</div>
				</div>
			</div>
		));
	}
	return (
		<div className={style.contactListContainer}>
			<div className={style.contactListWrapper}>
				<div className={style.title}>Contact List</div>
				<SearchBox onChange={(q) => setQuery(q)} />
				{!!recentContact?.length && (
					<>
						<div className={style.sectionTitle}>recent</div>
						<div>{renderContact(recentContact)}</div>
						<div className={style.separator} />
					</>
				)}
				<div>{renderContact(contacts)}</div>
				{loading && <p>Loading...</p>}
				<div ref={loader} />
			</div>
			<div className={style.mainPageImage} />
		</div>
	);
};

export default ContactList;
