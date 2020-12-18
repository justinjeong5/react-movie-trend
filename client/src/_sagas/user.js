import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import { BACKEND_URL } from '../Config'

import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  AUTHENTICATE_USER_REQUEST, AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE,
} from './types'

function logInAPI(data) {
  return axios.post(`${BACKEND_URL}/api/user/login`, data, { withCredentials: true })
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.payload);
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOGIN_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function registerAPI(data) {
  return axios.post(`${BACKEND_URL}/api/user/register`, data, { withCredentials: true })
}

function* register(action) {
  try {
    const result = yield call(registerAPI, action.payload);
    yield put({
      type: REGISTER_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: REGISTER_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function logoutAPI() {
  return axios.get(`${BACKEND_URL}/api/user/logout`, { withCredentials: true })
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOGOUT_USER_SUCCESS,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOGOUT_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function authAPI() {
  return axios.get(`${BACKEND_URL}/api/user/auth`, { withCredentials: true })
}

function* auth() {
  try {
    const result = yield call(authAPI);
    console.log(result, 'result authAPI')
    yield put({
      type: AUTHENTICATE_USER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: AUTHENTICATE_USER_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_USER_REQUEST, logIn)
}

function* watchRegister() {
  yield takeLatest(REGISTER_USER_REQUEST, register)
}

function* watchLogout() {
  yield takeLatest(LOGOUT_USER_REQUEST, logout)
}

function* watchAuthUser() {
  yield takeLatest(AUTHENTICATE_USER_REQUEST, auth)
}


export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchRegister),
    fork(watchLogout),
    fork(watchAuthUser),
  ])
}