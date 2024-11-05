import { createAction } from 'redux-actions';

export const signIn = {
  request: createAction('SIGN_IN_REQUEST'),
  success: createAction('SIGN_IN_SUCCESS'),
  failure: createAction('SIGN_IN_FAILURE'),
};

export const signUp = {
  request: createAction('SIGN_UP_REQUEST'),
  success: createAction('SIGN_UP_SUCCESS'),
  failure: createAction('SIGN_UP_FAILURE'),
};


export const users = {
  request: createAction('USERS_REQUEST'),
  success: createAction('USERS_SUCCESS'),
  failure: createAction('USERS_FAILURE'),
};

export const deleteUser = {
  request: createAction('DELETE_USER_REQUEST'),
  success: createAction('DELETE_USER_SUCCESS'),
  failure: createAction('DELETE_USER_FAILURE'),
};
