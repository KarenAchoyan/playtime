import {handleActions} from 'redux-actions';
import {
    deleteUser,
    signIn,
    signUp,
    users
} from './actions';
import {deleteCategory} from "../category/actions";

const initialState = {
    user: {},
    users:[],
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: [],
};

const userReducer = handleActions(
    {
        [users.success]: (state, {payload}) => ({
            ...state,
            users: payload,
            isFetching: false,
        }),

        [users.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [signIn.success]: (state, {payload}) => ({
            ...state,
            user: payload,
            isFetching: false,
        }),

        [signIn.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [signUp.success]: (state, {payload}) => ({
            ...state,
            user: payload,
            isFetching: false,
        }),

        [signUp.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),

        [deleteUser.success]: (state, {payload}) => ({
            ...state,
            users: state.users.filter((category) => category.id !== payload),
            isDeleting: false,
        }),
        [deleteUser.failure]: (state, {payload}) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default userReducer;
