import {takeLatest, call, put} from 'redux-saga/effects';
import {
    getSlides,
    getSlide,
    addSlide,
    updateSlide,
    deleteSlide,
    updateSlideInterval
} from './actions';
import axiosInstance from 'configs/axiosIntance';

// Slide Sagas
function* fetchSlidesSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/slides', payload));
        const slides = response.data;
        yield put(getSlides.success(slides));
    } catch (error) {
        yield put(getSlides.failure(error.message));
    }
}

function* fetchSlideSaga(action) {
    try {
        const {id} = action.payload;
        const slide = yield call(() => axiosInstance.get(`/slides/${id}`, action.payload));
        yield put(getSlide.success(slide));
    } catch (error) {
        yield put(getSlide.failure(error.message));
    }
}
function* fetchSlideUpdateInterval(action) {
    try {
        const slide = yield call(() => axiosInstance.post(`/slides/interval`, action.payload));
        yield put(updateSlideInterval.success(slide));
    } catch (error) {
        yield put(updateSlideInterval.failure(error.message));
    }
}

function* addSlideSaga(action) {
    try {
        const newSlide = yield call(() => axiosInstance.post('/slides', action.payload));
        yield put(addSlide.success(newSlide));
    } catch (error) {
        yield put(addSlide.failure(error.message));
    }
}

function* updateSlideSaga(action) {
    try {
        const {id, formData} = action.payload;
        const updatedSlide = yield call(() => axiosInstance.post(`/slides/${id}`, formData));
        yield put(updateSlide.success(updatedSlide.data.data));
    } catch (error) {
        yield put(updateSlide.failure(error.message));
    }
}

function* deleteSlideSaga(action) {
    try {
        const {payload: slideId} = action;
        yield call(() => axiosInstance.delete(`/slides/${slideId}`));
        yield put(deleteSlide.success(slideId));
    } catch (error) {
        yield put(deleteSlide.failure(error.message));
    }
}

// Slide Watcher Saga
export function* slideSaga() {
    yield takeLatest(getSlides.request, fetchSlidesSaga);
    yield takeLatest(getSlide.request, fetchSlideSaga);
    yield takeLatest(addSlide.request, addSlideSaga);
    yield takeLatest(updateSlide.request, updateSlideSaga);
    yield takeLatest(deleteSlide.request, deleteSlideSaga);
    yield takeLatest(updateSlideInterval.request, fetchSlideUpdateInterval);
}
