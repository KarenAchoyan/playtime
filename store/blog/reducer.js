import {handleActions} from 'redux-actions';
import {
    getBlogs,
    getBlog,
    addBlog,
    updateBlog,
    deleteBlog, searchBlogs,
} from './actions';
import {searchProducts} from "../products/actions";

const initialState = {
    blogs: [],
    selectedBlog: null,
    isFetching: false,
    searchResult: [],
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};

const blogReducer = handleActions(
    {
        [searchBlogs.success]: (state, {payload}) => ({
            ...state,
            searchResult: payload,
            isFetching: false,
        }),
        [searchBlogs.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getBlogs]: (state) => ({
            ...state,
            isFetching: true,
            error: null,
        }),
        [getBlog]: (state) => ({
            ...state,
            isFetching: true,
            error: null,
        }),
        [addBlog]: (state) => ({
            ...state,
            isAdding: true,
            error: null,
        }),
        [updateBlog]: (state) => ({
            ...state,
            isUpdating: true,
            error: null,

        }),
        [deleteBlog]: (state) => ({
            ...state,
            isDeleting: true,
            error: null,
        }),
        [getBlogs.success]: (state, {payload}) => ({
            ...state,
            blogs: payload,
            isFetching: false,
        }),
        [getBlog.success]: (state, {payload}) => ({
            ...state,
            selectedBlog: payload,
            isFetching: false,
        }),
        [addBlog.success]: (state, {payload}) => ({
            ...state,
            blogs: [...state.blogs, payload],
            isAdding: false,
        }),
        [updateBlog.success]: (state, {payload}) => ({
            ...state,
            blogs: state.blogs.map((blog) =>
                blog.id === payload.data.data.id ? payload.data.data : blog
            ),
            isUpdating: false,
        }),
        [deleteBlog.success]: (state, {payload}) => ({
            ...state,
            blogs: state.blogs.filter((blog) => blog.id !== payload),
            isDeleting: false,
        }),
        [getBlogs.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getBlog.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [addBlog.failure]: (state, {payload}) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [updateBlog.failure]: (state, {payload}) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [deleteBlog.failure]: (state, {payload}) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default blogReducer;
