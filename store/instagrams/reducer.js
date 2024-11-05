import { handleActions } from 'redux-actions';
import {
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost,
} from './actions';

const initialState = {
    posts: [],
    selectedPost: null,
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};

const postReducer = handleActions(
    {
        [getPosts.success]: (state, { payload }) => ({
            ...state,
            posts: payload,
            isFetching: false,
        }),
        [getPost.success]: (state, { payload }) => ({
            ...state,
            selectedPost: payload,
            isFetching: false,
        }),
        [addPost.success]: (state, { payload }) => ({
            ...state,
            posts: [...state.posts, payload],
            isAdding: false,
        }),
        [updatePost.success]: (state, { payload }) => ({
            ...state,
            posts: state.posts.map((post) =>
                post.id === payload.id ? payload : post
            ),
            isUpdating: false,
        }),
        [deletePost.success]: (state, { payload }) => ({
            ...state,
            posts: state.posts.filter((post) => post.id !== payload),
            isDeleting: false,
        }),
        [getPosts.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getPost.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [addPost.failure]: (state, { payload }) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [updatePost.failure]: (state, { payload }) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [deletePost.failure]: (state, { payload }) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default postReducer;
