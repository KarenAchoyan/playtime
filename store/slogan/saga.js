import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getSlogan, updateSlogan
} from './actions';
import axiosInstance from "configs/axiosIntance";
import update from "../../pages/admin/contact/update";


function* fetchSloganSaga() {
  try {
    const response = yield call(() => axiosInstance.get('/slogans'));
    const contact = response.data.about; // Assuming the contact data is in response.data.contact
    yield put(getSlogan.success(contact));
  } catch (error) {
    yield put(getSlogan.failure(error.message));
  }
}

function* updateSloganSaga(action) {
  try {
    const updatedContact = yield call(() => axiosInstance.post(`/slogans`, action.payload));
    yield put(updateSlogan.success(updatedContact.about));
  } catch (error) {
    yield put(updateSlogan.failure(error.message));
  }
}

// Contact Watcher Saga
export function* sloganSaga() {
  yield takeLatest(getSlogan.request, fetchSloganSaga);
  yield takeLatest(updateSlogan.request, updateSloganSaga);
}