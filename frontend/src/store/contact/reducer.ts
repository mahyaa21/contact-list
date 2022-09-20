import { AnyAction } from "redux";
import {
	CONTACT_CREATED,
	CONTACT_FETCHED,
	CONTACT_REQUEST_FAILURE,
	CONTACT_REQUEST_INPROGRESS,
	SINGLE_CONTACT_FETCHED,
	CONTACT_UPDATED,
	CLEAR,
} from "../constants";
import { ReducerInitialState } from "../../interfaces/reducerInitialState.interface";
import {
	ContactInterface,
	ContactListInterface,
} from "../../interfaces/contact.interface";
import Utils from "../../lib/utils";
const initialState: ReducerInitialState<{
	list: ContactListInterface;
	recentContact: Array<ContactInterface>;
}> = {
	loading: false,
	data: {
		list: {
			meta: null,
			items: [],
		},
		recentContact: []
	},
	error: false,
};

export default function (
	state = initialState,
	action: AnyAction
): ReducerInitialState {
	if (action.type === CONTACT_REQUEST_INPROGRESS) {
		return {
			...state,
			loading: true,
			error: false,
		};
	} else if (action.type === CONTACT_FETCHED) {
		const list = action.payload?.data;
		return {
			data: {
				...state.data,
				list,
			},
			loading: false,
			error: false,
		};
	} else if (action.type === SINGLE_CONTACT_FETCHED) {
		// const recentContact = [...state.data.recentContact, action.payload?.data];
		const recentContact = Utils.normalizeCashedArray(state.data.recentContact, action.payload?.data, 4);
		return {
			data: {
				list: {
					...state.data.list,
				},
				recentContact
			},
			loading: false,
			error: false,
		};
	} else if ([CONTACT_CREATED, CONTACT_UPDATED].includes(action.type)) {
		return {
			data: {
				list: state.data.list,
				...state.data.recentContact
			},
			loading: false,
			error: false,
		};
	} else if (action.type === CONTACT_REQUEST_FAILURE) {
		return {
			...state,
			error: true,
			loading: false,
			errorCode: action.payload?.errorCode,
			errorMessage: action.payload?.errorMessage,
		};
	} else if (action.type === CLEAR) {
		return initialState;
	}
	return state;
}
