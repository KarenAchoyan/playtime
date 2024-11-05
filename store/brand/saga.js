import { takeLatest, call, put } from 'redux-saga/effects';
import {
    getBrands,
    addBrand,
    updateBrand,
    deleteBrand,
} from './actions';
import axiosInstance from 'configs/axiosIntance';

// Brand Sagas
function* fetchBrandsSaga({ payload = {} }) {
    try {
        const response = yield call(() => axiosInstance.get('/brands', payload));
        const brands = response.data;
        yield put(getBrands.success(brands));
    } catch (error) {
        yield put(getBrands.failure(error.message));
    }
}



function* addBrandSaga(action) {
    try {
        const newBrand = yield call(() => axiosInstance.post('/brands', action.payload));
        yield put(addBrand.success(newBrand));
    } catch (error) {
        yield put(addBrand.failure(error.message));
    }
}

function* updateBrandSaga(action) {
    try {
        const { id, formData } = action.payload;
        const updatedBrand = yield call(() => axiosInstance.post(`/brands/${id}`, formData));
        yield put(updateBrand.success(updatedBrand.data.data));
    } catch (error) {
        yield put(updateBrand.failure(error.message));
    }
}

function* deleteBrandSaga(action) {
    try {
        const { payload: brandId } = action;
        yield call(() => axiosInstance.delete(`/brands/${brandId}`));
        yield put(deleteBrand.success(brandId));
    } catch (error) {
        yield put(deleteBrand.failure(error.message));
    }
}

// Brand Watcher Saga
export function* brandSaga() {
    yield takeLatest(getBrands.request, fetchBrandsSaga);
    yield takeLatest(addBrand.request, addBrandSaga);
    yield takeLatest(updateBrand.request, updateBrandSaga);
    yield takeLatest(deleteBrand.request, deleteBrandSaga);
}
