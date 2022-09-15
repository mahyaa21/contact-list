import { Dispatch } from 'redux';

export type Dispatcher<R = void> = (dispatch: Dispatch) => Promise<R>;