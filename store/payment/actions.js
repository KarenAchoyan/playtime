import { createAction } from 'redux-actions';

export const paymentSignIn = {
  request: createAction('SEND_PAYMENT_REQUEST'),
  success: createAction('SEND_PAYMENT_SUCCESS'),
  failure: createAction('SEND_PAYMENT_FAILURE'),
};
export const filterPayments = {
  request: createAction('FILTER_PAYMENT_REQUEST'),
  success: createAction('FILTER_PAYMENT_SUCCESS'),
  failure: createAction('FILTER_PAYMENT_FAILURE'),
};

export const getOrders = {
  request: createAction('GET_ORDERS_REQUEST'),
  success: createAction('GET_ORDERS_SUCCESS'),
  failure: createAction('GET_ORDERS_FAILURE'),
};
export const doneOrInProgress = {
  request: createAction('UPDATE_DONE_OR_IN_PROGRESS_REQUEST'),
  success: createAction('UPDATE_DONE_OR_IN_PROGRESS_SUCCESS'),
  failure: createAction('UPDATE_DONE_OR_IN_PROGRESS_FAILURE'),
};


