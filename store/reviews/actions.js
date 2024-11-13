import { createAction } from 'redux-actions';

// Actions for Reviews CRUD
export const getReviews = {
  request: createAction('GET_REVIEWS_REQUEST'),
  success: createAction('GET_REVIEWS_SUCCESS'),
  failure: createAction('GET_REVIEWS_FAILURE'),
};

export const addReview = {
  request: createAction('ADD_REVIEW_REQUEST'),
  success: createAction('ADD_REVIEW_SUCCESS'),
  failure: createAction('ADD_REVIEW_FAILURE'),
};

export const updateReview = {
  request: createAction('UPDATE_REVIEW_REQUEST'),
  success: createAction('UPDATE_REVIEW_SUCCESS'),
  failure: createAction('UPDATE_REVIEW_FAILURE'),
};

export const deleteReview = {
  request: createAction('DELETE_REVIEW_REQUEST'),
  success: createAction('DELETE_REVIEW_SUCCESS'),
  failure: createAction('DELETE_REVIEW_FAILURE'),
};
