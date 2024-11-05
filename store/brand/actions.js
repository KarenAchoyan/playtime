import { createAction } from 'redux-actions';

// Actions for Brands CRUD
export const getBrands = {
  request: createAction('GET_BRANDS_REQUEST'),
  success: createAction('GET_BRANDS_SUCCESS'),
  failure: createAction('GET_BRANDS_FAILURE'),
};

export const addBrand = {
  request: createAction('ADD_BRAND_REQUEST'),
  success: createAction('ADD_BRAND_SUCCESS'),
  failure: createAction('ADD_BRAND_FAILURE'),
};


export const updateBrand = {
  request: createAction('UPDATE_BRAND_REQUEST'),
  success: createAction('UPDATE_BRAND_SUCCESS'),
  failure: createAction('UPDATE_BRAND_FAILURE'),
};

export const deleteBrand = {
  request: createAction('DELETE_BRAND_REQUEST'),
  success: createAction('DELETE_BRAND_SUCCESS'),
  failure: createAction('DELETE_BRAND_FAILURE'),
};
