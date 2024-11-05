import {takeLatest, call, put} from 'redux-saga/effects';
import {
    paymentSignIn,
    filterPayments,
    getOrders, doneOrInProgress
} from './actions';
import axiosInstance from "configs/axiosIntance";


function* fetchSignInSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.post('/payment/signIn', payload));
        const user = response.data;
        yield put(paymentSignIn.success(user));
    } catch (error) {
        yield put(paymentSignIn.failure(error.message));
    }
}
function* fetchGetOrders({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/payment/orders', payload));
        const user = response.data;
        yield put(getOrders.success(user));
    } catch (error) {
        yield put(getOrders.failure(error.message));
    }
}


function* fetchFilterOrders({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.post('/payment/filter', payload));
        const user = response.data;
        yield put(filterPayments.success(user));
    } catch (error) {
        yield put(filterPayments.failure(error.message));
    }
}

function* fetchDone({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get(`/payment/doneOrInProgress/${payload.id}/${payload.done}`));
        const data = response.data;
        console.log(data)
        yield put(doneOrInProgress.success(data));
    } catch (error) {
        yield put(doneOrInProgress.failure(error.message));
    }
}

export function* paymentSaga() {
    yield takeLatest(paymentSignIn.request, fetchSignInSaga);
    yield takeLatest(filterPayments.request, fetchFilterOrders);
    yield takeLatest(getOrders.request, fetchGetOrders);
    yield takeLatest(doneOrInProgress.request, fetchDone);
}
