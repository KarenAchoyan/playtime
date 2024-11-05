import { createAction } from "redux-actions";

export const getRate = {
  request: createAction('GET_RATE_REQUEST'),
  success: createAction('GET_RATE_SUCCESS'),
  failure: createAction('GET_RATE_FAILURE'),
};
