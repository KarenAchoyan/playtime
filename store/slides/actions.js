import { createAction } from 'redux-actions';

// Actions for Slides CRUD
export const getSlides = {
  request: createAction('GET_SLIDES_REQUEST'),
  success: createAction('GET_SLIDES_SUCCESS'),
  failure: createAction('GET_SLIDES_FAILURE'),
};

export const getSlide = {
  request: createAction('GET_SLIDE_REQUEST'),
  success: createAction('GET_SLIDE_SUCCESS'),
  failure: createAction('GET_SLIDE_FAILURE'),
};

export const addSlide = {
  request: createAction('ADD_SLIDE_REQUEST'),
  success: createAction('ADD_SLIDE_SUCCESS'),
  failure: createAction('ADD_SLIDE_FAILURE'),
};
export const updateSlideInterval = {
  request: createAction('UPDATE_SLIDE_INTERVAL_REQUEST'),
  success: createAction('UPDATE_SLIDE_INTERVAL_SUCCESS'),
  failure: createAction('UPDATE_SLIDE_INTERVAL_FAILURE'),
};

export const updateSlide = {
  request: createAction('UPDATE_SLIDE_REQUEST'),
  success: createAction('UPDATE_SLIDE_SUCCESS'),
  failure: createAction('UPDATE_SLIDE_FAILURE'),
};

export const deleteSlide = {
  request: createAction('DELETE_SLIDE_REQUEST'),
  success: createAction('DELETE_SLIDE_SUCCESS'),
  failure: createAction('DELETE_SLIDE_FAILURE'),
};
