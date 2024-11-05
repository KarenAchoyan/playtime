import { createAction } from 'redux-actions';

// Actions for Products CRUD
export const getProducts = {
  request: createAction('GET_PRODUCTS_REQUEST'),
  success: createAction('GET_PRODUCTS_SUCCESS'),
  failure: createAction('GET_PRODUCTS_FAILURE'),
};

export const getImportantProducts = {
  request: createAction('GET_IMPORTANT_PRODUCTS_REQUEST'),
  success: createAction('GET_IMPORTANT_PRODUCTS_SUCCESS'),
  failure: createAction('GET_IMPORTANT_PRODUCTS_FAILURE'),
};
export const getProductsCategories = {
  request: createAction('GET_CATEGORIES_PRODUCTS_REQUEST'),
  success: createAction('GET_CATEGORIES_PRODUCTS_SUCCESS'),
  failure: createAction('GET_CATEGORIES_PRODUCTS_FAILURE'),
};
export const getNewProducts = {
  request: createAction('GET_NEW_PRODUCTS_REQUEST'),
  success: createAction('GET_NEW_PRODUCTS_SUCCESS'),
  failure: createAction('GET_NEW_PRODUCTS_FAILURE'),
};
export const getProductsAll = {
  request: createAction('GET_PRODUCTS_ALL_REQUEST'),
  success: createAction('GET_PRODUCTS_ALL_SUCCESS'),
  failure: createAction('GET_PRODUCTS_ALL_FAILURE'),
};
export const hasProduct = {
  request: createAction('HAS_PRODUCT_REQUEST'),
  success: createAction('HAS_PRODUCT_SUCCESS'),
  failure: createAction('HAS_PRODUCT_FAILURE'),
};
export const filterProducts = {
  request: createAction('FILTER_PRODUCTS_REQUEST'),
  success: createAction('FILTER_PRODUCTS_SUCCESS'),
  failure: createAction('FILTER_PRODUCTS_FAILURE'),
};

export const searchProducts = {
  request: createAction('SEARCH_PRODUCTS_REQUEST'),
  success: createAction('SEARCH_PRODUCTS_SUCCESS'),
  failure: createAction('SEARCH_PRODUCTS_FAILURE'),
};

export const getProduct = {
  request: createAction('GET_PRODUCT_REQUEST'),
  success: createAction('GET_PRODUCT_SUCCESS'),
  failure: createAction('GET_PRODUCT_FAILURE'),
};

export const addProduct = {
  request: createAction('ADD_PRODUCT_REQUEST'),
  success: createAction('ADD_PRODUCT_SUCCESS'),
  failure: createAction('ADD_PRODUCT_FAILURE'),
};

export const updateProduct = {
  request: createAction('UPDATE_PRODUCT_REQUEST'),
  success: createAction('UPDATE_PRODUCT_SUCCESS'),
  failure: createAction('UPDATE_PRODUCT_FAILURE'),
};

export const deleteProduct = {
  request: createAction('DELETE_PRODUCT_REQUEST'),
  success: createAction('DELETE_PRODUCT_SUCCESS'),
  failure: createAction('DELETE_PRODUCT_FAILURE'),
};
