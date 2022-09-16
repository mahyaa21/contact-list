import { combineReducers } from "redux";
import contacts from "./contact/reducer";
import { ContactInterface } from "../interfaces/contact.interface";
import { ReducerInitialState } from "../interfaces/reducerInitialState.interface";

export interface RootState {
	contacts: ReducerInitialState<{
        list: Array<ContactInterface >;
    }>;
}

export default combineReducers<RootState>({
	contacts,
});
