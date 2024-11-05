// reducer.js

import {handleActions} from 'redux-actions';
import {
    getContact,
    getAllContacts,
    updateContact,
    deleteContact,
    insertContact, getAbout, updateAbout, // Add the new insertContact action
} from './actions';

const initialState = {
    contact: null,
    contacts: [],
    about:{},
    isFetching: false,
    isUpdating: false,
    isDeleting: false,
    isInserting: false,
    error: null,
};

const contactReducer = handleActions(
    {
        [getContact.request]: (state) => ({
            ...state,
            isFetching: true,
            error: null,
        }),
        [getAbout.request]: (state) => ({
            ...state,
            isFetching: true,
            error: null,
        }),
        [getAllContacts.request]: (state) => ({
            ...state,
            isFetching: true,
            error: null,
        }),
        [updateContact.request]: (state) => ({
            ...state,
            isUpdating: true,
            error: null,
        }),
        [deleteContact.request]: (state) => ({
            ...state,

            isDeleting: true,
            error: null,
        }),
        [insertContact.request]: (state) => ({
            ...state,
            isInserting: true, // Set isInserting to true when inserting data
            error: null,
        }),
        [getContact.success]: (state, {payload}) => ({
            ...state,
            contact: payload,
            isFetching: false,
        }),
        [getAbout.success]: (state, {payload}) => ({
            ...state,
            about: payload,
            isFetching: false,
        }),
        [getAllContacts.success]: (state, {payload}) => ({
            ...state,
            contacts: payload,
            isFetching: false,
        }),
        [updateContact.success]: (state, {payload}) => ({
            ...state,
            contact: payload,
            isUpdating: false,
        }),
        [updateAbout.success]: (state, {payload}) => ({
            ...state,
            about: payload,
            isUpdating: true,
        }),
        [deleteContact.success]: (state, {payload}) => ({
            ...state,
            contacts: state.contacts.filter((contact) => contact.id !== payload),
            isDeleting: false,
        }),
        [insertContact.success]: (state) => ({
            ...state,
            isInserting: false, // Set isInserting to false when insert is successful
        }),
        [getContact.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getAbout.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getAllContacts.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [updateContact.failure]: (state, {payload}) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [updateAbout.failure]: (state, {payload}) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [deleteContact.failure]: (state, {payload}) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
        [insertContact.failure]: (state, {payload}) => ({
            ...state,
            isInserting: false, // Set isInserting to false on insert failure
            error: payload,
        }),
    },
    initialState
);

export default contactReducer;
