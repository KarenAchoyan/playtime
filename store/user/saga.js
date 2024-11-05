import {takeLatest, call, put} from 'redux-saga/effects';
import {
    deleteUser,
    signIn,
    signUp, users
} from './actions';
import axiosInstance from "configs/axiosIntance";
import {deleteCategory} from "../category/actions";


// Category Sagas
function* fetchSignInSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.post('/auth/signIn', payload));
        const user = response.data;
        yield put(signIn.success(user));
    } catch (error) {
        yield put(signIn.failure(error.message));
    }
}
function* fetchSignUpSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.post('/auth/register', payload));
        const user = response.data;
        yield put(signUp.success(user));
    } catch (error) {
        yield put(signUp.failure(error.message));
    }
}
function* getAllUsers({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/auth/users', payload));
        const user = response.data.users;
        yield put(users.success(user));
    } catch (error) {
        yield put(users.failure(error));
    }
}


function* deleteUserSaga(action) {
    try {
        const { payload: id } = action; // Extract the categoryId from the payload
        yield call(() => axiosInstance.delete(`/auth/users/${id}`));
        yield put(deleteUser.success(id));
    } catch (error) {
        yield put(deleteUser.failure(error.message));
    }
}
export function* userSaga() {
    yield takeLatest(signIn.request, fetchSignInSaga);
    yield takeLatest(signUp.request, fetchSignUpSaga);
    yield takeLatest(users.request, getAllUsers);
    yield takeLatest(deleteUser.request, deleteUserSaga);
}
