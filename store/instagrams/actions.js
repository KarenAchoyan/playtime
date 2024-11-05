import { createAction } from 'redux-actions';

// Actions for Instagram Posts CRUD
export const getPosts = {
  request: createAction('GET_POSTS_REQUEST'),
  success: createAction('GET_POSTS_SUCCESS'),
  failure: createAction('GET_POSTS_FAILURE'),
};

export const getPost = {
  request: createAction('GET_POST_REQUEST'),
  success: createAction('GET_POST_SUCCESS'),
  failure: createAction('GET_POST_FAILURE'),
};

export const addPost = {
  request: createAction('ADD_POST_REQUEST'),
  success: createAction('ADD_POST_SUCCESS'),
  failure: createAction('ADD_POST_FAILURE'),
};

export const updatePost = {
  request: createAction('UPDATE_POST_REQUEST'),
  success: createAction('UPDATE_POST_SUCCESS'),
  failure: createAction('UPDATE_POST_FAILURE'),
};

export const deletePost = {
  request: createAction('DELETE_POST_REQUEST'),
  success: createAction('DELETE_POST_SUCCESS'),
  failure: createAction('DELETE_POST_FAILURE'),
};
