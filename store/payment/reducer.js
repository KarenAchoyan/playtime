import {handleActions} from 'redux-actions';
import {
    paymentSignIn,
    filterPayments,
    getOrders,
    doneOrInProgress
} from './actions';
import {getProducts} from "../products/actions";

const initialState = {
    response:{},
    orders: [],
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: [],
};


const paymentReducer = handleActions(
    {
        [paymentSignIn.success]: (state, {payload}) => ({
            ...state,
            response:payload,
            isInserting: true,
        }),

        [paymentSignIn.failure]: (state, {payload}) => ({
            ...state,
            isInserting: false,
            error: payload,
        }),
        [doneOrInProgress.success]: (state, {payload}) => ({
            ...state,
            orders:payload,
            isUpdating: true,
        }),

        [doneOrInProgress.failure]: (state, {payload}) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),

        [filterPayments.success]: (state, {payload}) => ({
            ...state,
            orders: payload,
            isFetching: false,
        }),
        [filterPayments.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),

        [getOrders.success]: (state, {payload}) => ({
            ...state,
            orders: payload,
            isFetching: false,
        }),
        [getOrders.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),

    },
    initialState
);

export default paymentReducer;
