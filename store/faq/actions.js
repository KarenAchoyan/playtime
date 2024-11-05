import {createAction} from "redux-actions";

export const getFaqs = {
  request: createAction('GET_FAQS_REQUEST'),
  success: createAction('GET_FAQS_SUCCESS'),
  failure: createAction('GET_FAQS_FAILURE'),
};

export const updateFaq = {
  request: createAction('UPDATE_FAQ_REQUEST'),
  success: createAction('UPDATE_FAQ_SUCCESS'),
  failure: createAction('UPDATE_FAQ_FAILURE'),
};

export const insertFaq = {
  request: createAction('INSERT_FAQ_REQUEST'),
  success: createAction('INSERT_FAQ_SUCCESS'),
  failure: createAction('INSERT_FAQ_FAILURE'),
};


export const deleteFaq = {
  request: createAction('DELETE_FAQ_REQUEST'),
  success: createAction('DELETE_FAQ_SUCCESS'),
  failure: createAction('DELETE_FAQ_FAILURE'),
};