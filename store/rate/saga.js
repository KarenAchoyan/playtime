import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getRate,
} from './actions';
import axiosInstance from "configs/axiosIntance";


function* fetchRateSaga() {
  try {
    const response = yield call(() => axiosInstance.get('/rates'));
    const rate = response.data;
    yield put(getRate.success(rate));
  } catch (error) {
    yield put(getRate.failure(error.message));
  }
}

// Contact Watcher Saga
export function* rateSaga() {
  yield takeLatest(getRate.request, fetchRateSaga);
}