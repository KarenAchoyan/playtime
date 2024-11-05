// reducer.js

import { handleActions } from 'redux-actions';
import {
    getContact,
    getAllContacts,
    updateContact,
    deleteContact,
    insertContact, getFaqs, deleteFaq, insertFaq, updateFaq, // Add the new insertContact action
} from './actions';
import {addBlog, deleteBlog, getBlog, getBlogs, updateBlog} from "../blog/actions";

const initialState = {
  faqs: [],
  isFetching: false,
  isUpdating: false,
  isDeleting: false,
  isInserting: false,
  error: null,
};

const faqReducer = handleActions(
  {
      [getFaqs]: (state) => ({
          ...state,
          isFetching: true,
          error: null,
      }),
      [insertFaq]: (state) => ({
          ...state,
          isAdding: true,
          error: null,
      }),
      [updateFaq]: (state) => ({
          ...state,
          isUpdating: true,
          error: null,
      }),
      [deleteFaq]: (state) => ({
          ...state,
          isDeleting: true,
          error: null,
      }),
      [getFaqs.success]: (state, { payload }) => ({
          ...state,
          faqs: payload,
          isFetching: false,
      }),
      [insertFaq.success]: (state, { payload }) => ({
          ...state,
          faqs: [...state.faqs, payload],
          isAdding: false,
      }),
      [updateFaq.success]: (state, { payload }) => ({
          ...state,
          faqs: state.faqs.map((blog) =>
              blog.id === payload.id ? payload : blog
          ),
          isUpdating: true,
      }),
      [getFaqs.failure]: (state, { payload }) => ({
          ...state,
          isFetching: false,
          error: payload,
      }),
      [getBlog.failure]: (state, { payload }) => ({
          ...state,
          isFetching: false,
          error: payload,
      }),
      [insertFaq.failure]: (state, { payload }) => ({
          ...state,
          isAdding: false,
          error: payload,
      }),
      [updateFaq.failure]: (state, { payload }) => ({
          ...state,
          isUpdating: false,
          error: payload,
      }),
      [deleteFaq.success]: (state, { payload }) => ({
          ...state,
          faqs: state.faqs.filter((faq) => faq.id !== payload),
          isDeleting: false,
      }),
      [deleteFaq.failure]: (state, { payload }) => ({
          ...state,
          isDeleting: false,
          error: payload,
      }),
  },
  initialState
);

export default faqReducer;
