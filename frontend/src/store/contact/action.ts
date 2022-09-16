import { Dispatcher } from "../../interfaces/dispatcher.interface";
import {
    CONTACT_REQUEST_INPROGRESS,
    CONTACT_FETCHED,
    CONTACT_REQUEST_FAILURE
} from '../constants';
import { RequestInstance } from "../request";
import { ContactInterface, ContactListInterface } from "../../interfaces/contact.interface";
export function getAllContact(): Dispatcher {
    return async (dispatch) => {
		try {
			dispatch({ type: CONTACT_REQUEST_INPROGRESS });

			const response = await RequestInstance.get<ContactListInterface>(
				`/passenger`,
			);

			dispatch({
				type: CONTACT_FETCHED,
				payload: { data: response.data },
			});
			return Promise.resolve();
		} catch (error) {
			return handleApplicationFailure(dispatch, error);
		}
	};
}

export function getContactById(id: string): Dispatcher {
    return async (dispatch) => {
		try {
			dispatch({ type: CONTACT_REQUEST_INPROGRESS });

			const response = await RequestInstance.get<ContactInterface>(
				`/passenger/${id}`,
			);

			dispatch({
				type: CONTACT_FETCHED,
				payload: { data: response.data },
			});
			return Promise.resolve();
		} catch (error) {
			return handleApplicationFailure(dispatch, error);
		}
	};
}

export function searchContact(params: string): Dispatcher {
    return async (dispatch) => {
		try {
			dispatch({ type: CONTACT_REQUEST_INPROGRESS });

			const response = await RequestInstance.get<ContactInterface>(
				`/passenger/?where={${params}}&sort=createdAt DESC&limit=30`,
			);

			dispatch({
				type: CONTACT_FETCHED,
				payload: { data: response.data },
			});
			return Promise.resolve();
		} catch (error) {
			return handleApplicationFailure(dispatch, error);
		}
	};
}
function handleApplicationFailure(dispatch: any, error: any) {
	const errorCode = error.response?.data?.status;
	const errorMessage = 'خطا';
	dispatch({
		type: CONTACT_REQUEST_FAILURE,
		payload: { errorMessage, errorCode },
	});
	return Promise.reject(errorMessage);
}