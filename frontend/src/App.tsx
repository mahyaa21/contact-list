import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllContact } from "./store/contact/action";
import MainLayout from "./components/layout/mainLayout/mainLayout";
import ContactList from "./components/contactList/ContactList";
import ContactDetail from "./components/contactDetail/ContactDetail";

function App() {
	const dispatch = useDispatch<any>();
	useEffect(() => {
		dispatch(getAllContact());
	}, []);
	return (
		<MainLayout>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ContactList />}/>
					<Route path="/:id" element={<ContactDetail />}/>
				</Routes>
			</BrowserRouter>
		</MainLayout>
	);
}

export default App;
