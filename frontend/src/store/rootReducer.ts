import { combineReducers } from "redux";
import contacts from "./contact/reducer";
import { ContactInterface, ContactListInterface } from "../interfaces/contact.interface";
import { ReducerInitialState } from "../interfaces/reducerInitialState.interface";

export interface RootState {
	contacts: ReducerInitialState<{
        list: ContactListInterface;
    }>;
}

export default combineReducers<RootState>({
	contacts,
});
