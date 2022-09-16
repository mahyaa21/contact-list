import { useEffect } from "react";
import { useDispatch, Provider } from "react-redux";
import { getAllContact } from "./store/contact/action";
import MainLayout from "./components/layout/mainLayout/mainLayout";

function App() {
	const dispatch = useDispatch<any>();
	useEffect(()=>{
	  dispatch(getAllContact());
	},[]);
	return <MainLayout>snapp contact list</MainLayout>;
}

export default App;
