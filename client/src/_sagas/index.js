import { all, fork } from 'redux-saga/effects'

import userSage from './user'
import movieSage from './movie'

export default function* rootSdaga() {
  yield all([
    fork(userSage),
    fork(movieSage),
  ]);
}