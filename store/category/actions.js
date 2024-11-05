import { createAction } from 'redux-actions';

export const getCategories = {
  request: createAction('GET_CATEGORIES_REQUEST'),
  success: createAction('GET_CATEGORIES_SUCCESS'),
  failure: createAction('GET_CATEGORIES_FAILURE'),
};

export const getSubCategories = {
  request: createAction('GET_SUB_CATEGORIES_REQUEST'),
  success: createAction('GET_SUB_CATEGORIES_SUCCESS'),
  failure: createAction('GET_SUB_CATEGORIES_FAILURE'),
};

export const getCategory = {
  request: createAction('GET_CATEGORY_REQUEST'),
  success: createAction('GET_CATEGORY_SUCCESS'),
  failure: createAction('GET_CATEGORY_FAILURE'),
};

export const addCategory = {
  request: createAction('ADD_CATEGORY_REQUEST'),
  success: createAction('ADD_CATEGORY_SUCCESS'),
  failure: createAction('ADD_CATEGORY_FAILURE'),
};

export const updateCategory = {
  request: createAction('UPDATE_CATEGORY_REQUEST'),
  success: createAction('UPDATE_CATEGORY_SUCCESS'),
  failure: createAction('UPDATE_CATEGORY_FAILURE'),
};

export const deleteCategory = {
  request: createAction('DELETE_CATEGORY_REQUEST'),
  success: createAction('DELETE_CATEGORY_SUCCESS'),
  failure: createAction('DELETE_CATEGORY_FAILURE'),
};
