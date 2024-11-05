import { createAction } from 'redux-actions';

export const getBlogs = {
  request: createAction('GET_BLOGS_REQUEST'),
  success: createAction('GET_BLOGS_SUCCESS'),
  failure: createAction('GET_BLOGS_FAILURE'),
};

export const getBlog = {
  request: createAction('GET_BLOG_REQUEST'),
  success: createAction('GET_BLOG_SUCCESS'),
  failure: createAction('GET_BLOG_FAILURE'),
};

export const searchBlogs = {
  request: createAction('SEARCH_BLOGS_REQUEST'),
  success: createAction('SEARCH_BLOGS_SUCCESS'),
  failure: createAction('SEARCH_BLOGS_FAILURE'),
};
export const addBlog = {
  request: createAction('ADD_BLOG_REQUEST'),
  success: createAction('ADD_BLOG_SUCCESS'),
  failure: createAction('ADD_BLOG_FAILURE'),
};

export const updateBlog = {
  success: createAction('UPDATE_BLOG_SUCCESS'),
  failure: createAction('UPDATE_BLOG_FAILURE'),
  request: createAction('UPDATE_BLOG_REQUEST'),
};

export const deleteBlog = {
  success: createAction('DELETE_BLOG_SUCCESS'),
  failure: createAction('DELETE_BLOG_FAILURE'),
  request: createAction('DELETE_BLOG_REQUEST'),
};
