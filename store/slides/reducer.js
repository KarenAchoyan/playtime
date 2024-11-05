import { handleActions } from 'redux-actions';
import {
    getSlides,
    getSlide,
    addSlide,
    updateSlide,
    deleteSlide,
    updateSlideInterval
} from './actions';

const initialState = {
    slides: [],
    selectedSlide: null,
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};

const slideReducer = handleActions(
    {
        [getSlides.success]: (state, { payload }) => ({
            ...state,
            slides: payload,
            isFetching: false,
        }),
        [getSlide.success]: (state, { payload }) => ({
            ...state,
            selectedSlide: payload,
            isFetching: false,
        }),
        [addSlide.success]: (state, { payload }) => ({
            ...state,
            slides: [...state.slides, payload],
            isAdding: false,
        }),
        [updateSlide.success]: (state, { payload }) => ({
            ...state,
            slides: state.slides.map((slide) =>
                slide.id === payload.id ? payload : slide
            ),
            isUpdating: true,
        }),
        [updateSlideInterval.success]: (state) => ({
            ...state,
            isUpdating: true,
        }),
        [deleteSlide.success]: (state, { payload }) => ({
            ...state,
            slides: state.slides.slides.filter((slide) => slide.id !== payload),
            isDeleting: false,
        }),
        [getSlides.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getSlide.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [addSlide.failure]: (state, { payload }) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [updateSlide.failure]: (state, { payload }) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [updateSlideInterval.failure]: (state, { payload }) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [deleteSlide.failure]: (state, { payload }) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default slideReducer;
