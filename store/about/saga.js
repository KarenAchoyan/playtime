import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getContact,
  getAllContacts, // Add the new action
  updateContact,
  deleteContact, // Add the new action
  insertContact,
  updateAbout,
  getAbout
} from './actions';
import axiosInstance from "configs/axiosIntance";
import update from "../../pages/admin/contact/update";


function* fetchContactSaga() {
  try {
    const response = yield call(() => axiosInstance.get('/contacts/first'));
    const contact = response.data; // Assuming the contact data is in response.data.contact
    yield put(getContact.success(contact));
  } catch (error) {
    yield put(getContact.failure(error.message));
  }
}
function* fetchAboutSaga() {
  try {
    const response = yield call(() => axiosInstance.get('/about'));
    const contact = response.data.about;
    yield put(getAbout.success(contact));
  } catch (error) {
    yield put(getAbout.failure(error.message));
  }
}
function* fetchAllContactsSaga() { // New saga for fetching all contacts
  try {
    const response = yield call(() => axiosInstance.get('/messages'));
    const contacts = response.data; // Assuming the contacts data is an array
    yield put(getAllContacts.success(contacts));
  } catch (error) {
    yield put(getAllContacts.failure(error.message));
  }
}
function* deleteContactSaga(action) { // New saga for deleting a contact
  try {
    const { id } = action.payload;
    yield call(() => axiosInstance.delete(`/contacts/${id}`));
    yield put(deleteContact.success(id));
  } catch (error) {
    yield put(deleteContact.failure(error.message));
  }
}

function* insertContactSaga(action) {
  try {
    const response = yield call(() => axiosInstance.post('/messages', action.payload));
    yield put(insertContact.success(response.data));
  } catch (error) {
    yield put(insertContact.failure(error.message));
  }
}
function* updateContactSaga(action) {
  try {
    const {id} = action.payload;
    const updatedContact = yield call(() => axiosInstance.put(`/contacts/${id}`, action.payload));
    yield put(updateContact.success(updatedContact.contact));
  } catch (error) {
    yield put(updateContact.failure(error.message));
  }
}
function* updateAboutSaga(action) {
  try {
    const updatedContact = yield call(() => axiosInstance.post(`/about`, action.payload));
    yield put(updateAbout.success(updatedContact.about));
  } catch (error) {
    yield put(updateAbout.failure(error.message));
  }
}

// Contact Watcher Saga
export function* contactSaga() {
  yield takeLatest(getContact.request, fetchContactSaga);
  yield takeLatest(getAllContacts.request, fetchAllContactsSaga);
  yield takeLatest(updateContact.request, updateContactSaga);
  yield takeLatest(deleteContact.request, deleteContactSaga);
  yield takeLatest(insertContact.request, insertContactSaga);
  yield takeLatest(getAbout.request, fetchAboutSaga);
  yield takeLatest(updateAbout.request, updateAboutSaga);
}