import { takeLatest, call, put } from 'redux-saga/effects';
import {
    getReviews,
    addReview,
    updateReview,
    deleteReview,
} from './actions';
import axiosInstance from 'configs/axiosIntance';
import {getProduct} from "../products/actions";

// Review Sagas
function* fetchReviewsSaga(action) {
    try {
        const {id} = action.payload;
        const response = yield call(() => axiosInstance.get(`/reviews/product/${id}`,  action.payload));
        const reviews = response.data.data;
        yield put(getReviews.success(reviews));
    } catch (error) {
        yield put(getReviews.failure(error.message));
    }
}

function* addReviewSaga(action) {
    try {
        const newReview = yield call(() => axiosInstance.post('/reviews', action.payload));
        yield put(addReview.success(newReview.data.data));
    } catch (error) {
        yield put(addReview.failure(error.message));
    }
}

function* updateReviewSaga(action) {
    try {
        const { id, formData } = action.payload;
        const updatedReview = yield call(() => axiosInstance.put(`/reviews/${id}`, formData));
        yield put(updateReview.success(updatedReview.data));
    } catch (error) {
        yield put(updateReview.failure(error.message));
    }
}

function* deleteReviewSaga(action) {
    try {
        const { payload: reviewId } = action;
        yield call(() => axiosInstance.delete(`/reviews/${reviewId}`));
        yield put(deleteReview.success(reviewId));
    } catch (error) {
        yield put(deleteReview.failure(error.message));
    }
}

// Review Watcher Saga
export function* reviewSaga() {
    yield takeLatest(getReviews.request, fetchReviewsSaga);
    yield takeLatest(addReview.request, addReviewSaga);
    yield takeLatest(updateReview.request, updateReviewSaga);
    yield takeLatest(deleteReview.request, deleteReviewSaga);
}
