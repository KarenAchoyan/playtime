// reducer.js

import {handleActions} from 'redux-actions';
import {
    getSlogan, updateSlogan
} from './actions';

const initialState = {
    slogan: {},
    isFetching: false,
    isUpdating: false,
    isDeleting: false,
    isInserting: false,
    error: null,
};

const sloganReducer = handleActions(
    {
        [getSlogan.request]: (state) => ({
            ...state,
            isFetching: true,
            error: null,
        }),
        [updateSlogan.request]: (state) => ({
            ...state,
            isUpdating: true,
            error: null,
        }),
        [getSlogan.success]: (state, {payload}) => ({
            ...state,
            about: payload,
            isFetching: false,
        }),
        [getSlogan.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [updateSlogan.failure]: (state, {payload}) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
    },
    initialState
);

export default sloganReducer;
