import { handleActions } from 'redux-actions';
import {
    getReviews,
    addReview,
    updateReview,
    deleteReview,
} from './actions';

const initialState = {
    reviews: [],
    selectedReview: null,
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};

const reviewReducer = handleActions(
    {
        // Success handlers
        [getReviews.success]: (state, { payload }) => ({
            ...state,
            reviews: payload,
            isFetching: false,
        }),
        [addReview.request]: (state) => ({
            ...state,
            isAdding: true,
        }),
        [addReview.success]: (state, { payload }) => ({
            ...state,
            reviews: [...state.reviews, payload],
            isAdding: false,
        }),
        [updateReview.success]: (state, { payload }) => ({
            ...state,
            reviews: state.reviews.map((review) =>
                review.id === payload.id ? payload : review
            ),
            isUpdating: false,
        }),
        [deleteReview.success]: (state, { payload }) => ({
            ...state,
            reviews: state.reviews.filter((review) => review.id !== payload),
            isDeleting: false,
        }),

        // Failure handlers
        [getReviews.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [addReview.failure]: (state, { payload }) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [updateReview.failure]: (state, { payload }) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [deleteReview.failure]: (state, { payload }) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default reviewReducer;
