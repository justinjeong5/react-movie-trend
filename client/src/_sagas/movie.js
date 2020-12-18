import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import { API_URL, API_KEY } from '../Config'

import {
  LOAD_MOVIES_REQUEST, LOAD_MOVIES_SUCCESS, LOAD_MOVIES_FAILURE,
  LOAD_MOVIE_DETAIL_REQUEST, LOAD_MOVIE_DETAIL_SUCCESS, LOAD_MOVIE_DETAIL_FAILURE,
} from './types'

function LoadMoviesAPI(data) {
  return axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${data}`)
}

function* loadMovies(action) {
  try {
    const result = yield call(LoadMoviesAPI, action.payload);
    yield put({
      type: LOAD_MOVIES_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOAD_MOVIES_FAILURE,
      error: error.response.data,
    })
  }
}

function LoadMovieDetailAPI(data) {
  return axios.get(`${API_URL}/movie/${data}?api_key=${API_KEY}&language=ko-KR`)
}

function* loadMovieDetail(action) {
  try {
    const result = yield call(LoadMovieDetailAPI, action.payload);
    yield put({
      type: LOAD_MOVIE_DETAIL_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOAD_MOVIE_DETAIL_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchLoadMovies() {
  yield takeLatest(LOAD_MOVIES_REQUEST, loadMovies)
}

function* watchLoadMovieDetail() {
  yield takeLatest(LOAD_MOVIE_DETAIL_REQUEST, loadMovieDetail)
}

export default function* movieSaga() {
  yield all([
    fork(watchLoadMovies),
    fork(watchLoadMovieDetail),
  ])
}