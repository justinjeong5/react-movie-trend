import { all, fork } from 'redux-saga/effects'
import axios from 'axios'

import userSage from './user'
import movieSage from './movie'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true;

export default function* rootSdaga() {
  yield all([
    fork(userSage),
    fork(movieSage),
  ]);
}