import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import { BACKEND_URL } from '../Config'

import {
  LOAD_FAVORITE_NUMBER_REQUEST, LOAD_FAVORITE_NUMBER_SUCCESS, LOAD_FAVORITE_NUMBER_FAILURE,
} from './types'

function LoadFavoriteNumberAPI(data) {
  return axios.post(`${BACKEND_URL}/api/favorite/favoriteNumber`, data, { withCredentials: true })
}

function* loadFavoriteNumber(action) {
  try {
    const result = yield call(LoadFavoriteNumberAPI, action.payload);
    yield put({
      type: LOAD_FAVORITE_NUMBER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOAD_FAVORITE_NUMBER_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLoadFavoriteNumber() {
  yield takeLatest(LOAD_FAVORITE_NUMBER_REQUEST, loadFavoriteNumber)
}

export default function* favoriteSaga() {
  yield all([
    fork(watchLoadFavoriteNumber),
  ])
}