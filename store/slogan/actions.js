import {createAction} from "redux-actions";

export const getSlogan = {
  request: createAction('GET_SLOGAN_REQUEST'),
  success: createAction('GET_SLOGAN_SUCCESS'),
  failure: createAction('GET_SLOGAN_FAILURE'),
};

export const updateSlogan = {
  request: createAction('UPDATE_SLOGAN_REQUEST'),
  success: createAction('UPDATE_SLOGAN_SUCCESS'),
  failure: createAction('UPDATE_SLOGAN_FAILURE'),
};

