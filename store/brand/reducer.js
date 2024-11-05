import { handleActions } from 'redux-actions';
import {
    getBrands,
    addBrand,
    updateBrand,
    deleteBrand,
} from './actions';

const initialState = {
    brands: [],
    selectedBrand: null,
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};

const brandReducer = handleActions(
    {
        [getBrands.success]: (state, { payload }) => ({
            ...state,
            brands: payload,
            isFetching: false,
        }),
        [addBrand.success]: (state, { payload }) => ({
            ...state,
            brands: [...state.brands, payload],
            isAdding: false,
        }),
        [updateBrand.success]: (state, { payload }) => ({
            ...state,
            brands: state.brands.map((brand) =>
                brand.id === payload.id ? payload : brand
            ),
            isUpdating: true,
        }),

        [deleteBrand.success]: (state, { payload }) => ({
            ...state,
            brands: state.brands.filter((brand) => brand.id !== payload),
            isDeleting: false,
        }),
        [getBrands.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),

        [addBrand.failure]: (state, { payload }) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [updateBrand.failure]: (state, { payload }) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),

        [deleteBrand.failure]: (state, { payload }) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default brandReducer;
