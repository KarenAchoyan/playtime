import { takeLatest, call, put } from 'redux-saga/effects';
import {
  deleteFaq,
  getFaqs, insertFaq, updateFaq

} from './actions';
import axiosInstance from "configs/axiosIntance";



function* fetchAllFaqsSaga() { // New saga for fetching all contacts
  try {
    const response = yield call(() => axiosInstance.get('/faqs'));
    const contacts = response.data; // Assuming the contacts data is an array
    yield put(getFaqs.success(contacts));
  } catch (error) {
    yield put(getFaqs.failure(error.message));
  }
}
function* deleteFaqSaga(action) {
  try {
    const { id } = action.payload;
    yield call(() => axiosInstance.delete(`/faqs/${id}`));
    yield put(deleteFaq.success(id));
  } catch (error) {
    yield put(deleteFaq.failure(error.message));
  }
}
function* insertFaqSaga(action) {
  try {
    const response = yield call(() => axiosInstance.post('/faqs', action.payload));
    yield put(insertFaq.success(response.data));
  } catch (error) {
    yield put(insertFaq.failure(error.message));
  }
}
function* updateFaqSaga(action) {
  try {
    const {id} = action.payload;
    const updatedContact = yield call(() => axiosInstance.put(`/faqs/${id}`, action.payload));
    yield put(updateFaq.success(updatedContact.data.faq));
  } catch (error) {
    yield put(updateFaq.failure(error.message));
  }
}

// Contact Watcher Saga
export function* faqSaga() {
  yield takeLatest(getFaqs.request, fetchAllFaqsSaga);
  yield takeLatest(updateFaq.request, updateFaqSaga);
  yield takeLatest(deleteFaq.request, deleteFaqSaga);
  yield takeLatest(insertFaq.request, insertFaqSaga);
}