// reducer.js

import { handleActions } from 'redux-actions';
import { getRate } from './actions';

const initialState = {
    rate: {},
    isFetching: false,
    error: null,
};

const rateReducer = handleActions(
    {
        [getRate.request]: (state) => ({
            ...state,
            isFetching: true,
            error: null,
        }),
        [getRate.success]: (state, { payload }) => ({
            ...state,
            rate: payload,
            isFetching: false,
        }),
        [getRate.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
    },
    initialState
);

export default rateReducer;
