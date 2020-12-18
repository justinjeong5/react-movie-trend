import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import { API_URL, API_KEY } from '../Config'

import {
  LOAD_MOVIES_REQUEST, LOAD_MOVIES_SUCCESS, LOAD_MOVIES_FAILURE,
  LOAD_MOVIE_DETAIL_REQUEST, LOAD_MOVIE_DETAIL_SUCCESS, LOAD_MOVIE_DETAIL_FAILURE,
  LOAD_MOVIE_TRAILER_REQUEST, LOAD_MOVIE_TRAILER_SUCCESS, LOAD_MOVIE_TRAILER_FAILURE,
  LOAD_MOVIE_CASTING_REQUEST, LOAD_MOVIE_CASTING_SUCCESS, LOAD_MOVIE_CASTING_FAILURE,
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

function LoadMovieTrailerAPI(data) {
  return axios.get(`${API_URL}/movie/${data}/videos?api_key=${API_KEY}`)
}

function* loadMovieTrailer(action) {
  try {
    const result = yield call(LoadMovieTrailerAPI, action.payload);
    yield put({
      type: LOAD_MOVIE_TRAILER_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOAD_MOVIE_TRAILER_FAILURE,
      error: error.response.data,
    })
  }
}

function LoadMovieCastingAPI(data) {
  return axios.get(`${API_URL}/movie/${data}/credits?api_key=${API_KEY}`)
}

function* loadMovieCasting(action) {
  try {
    const result = yield call(LoadMovieCastingAPI, action.payload);
    yield put({
      type: LOAD_MOVIE_CASTING_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOAD_MOVIE_CASTING_FAILURE,
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

function* watchLoadMovieTrailer() {
  yield takeLatest(LOAD_MOVIE_TRAILER_REQUEST, loadMovieTrailer)
}

function* watchLoadMovieCasting() {
  yield takeLatest(LOAD_MOVIE_CASTING_REQUEST, loadMovieCasting)
}

export default function* movieSaga() {
  yield all([
    fork(watchLoadMovies),
    fork(watchLoadMovieDetail),
    fork(watchLoadMovieTrailer),
    fork(watchLoadMovieCasting),
  ])
}