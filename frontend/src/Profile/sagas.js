import {call, put, takeEvery} from "@redux-saga/core/effects";
import * as authService from "../services/authService";
import {LOAD_USER, LOAD_USER_SUCCESS, SET_AUTH_DATA, SET_USER} from "./actionTypes";


export function* loadUser() {
    try {
        const user = yield call(authService.getCurrentUser);
        yield put({type: LOAD_USER_SUCCESS, payload: {user}})
    } catch (e) {
        console.log(e);
    }
}

const setToken = token => localStorage.setItem('token', token);

export function* setAuthData(user = null, token = '') {
    setToken(token);
    yield put( { type: LOAD_USER_SUCCESS, payload: { user } } )
}

export function* login(action) {
    try {
        const {user, token} = yield call(authService.login, action.request);
        yield put({ type: SET_AUTH_DATA, payload: { user, token } })
    } catch (e) {
        console.log(e);
    }
}

export default function* profileSaga() {
    yield takeEvery(LOAD_USER, loadUser);
    yield takeEvery(SET_USER, login);
    yield takeEvery(SET_AUTH_DATA, setAuthData)
}
