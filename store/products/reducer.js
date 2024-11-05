import {handleActions} from 'redux-actions';
import {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    filterProducts,
    searchProducts,
    hasProduct,
    getProductsAll,
    getNewProducts,
    getImportantProducts,
    getProductsCategories,
} from './actions';

const initialState = {
    products: [],
    importantProducts: [],
    newProducts: [],
    searchResult: [],
    selectedProduct: null,
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    isLoading:true,
    error: null,
};

const productReducer = handleActions(
    {
        [getProducts.success]: (state, {payload}) => ({
            ...state,
            products: payload,
            isFetching: false,
            isLoading:false,
        }),
        [getProducts.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            isLoading:false,
            error: payload,
        }),

        [getProductsCategories.success]: (state, {payload}) => ({
            ...state,
            products: payload,
            isFetching: false,
        }),
        [getProductsCategories.request]: (state) => ({
            ...state,
            isFetching: true,
        }),
        [getProductsCategories.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),

        [getNewProducts.success]: (state, {payload}) => ({
            ...state,
            newProducts: payload,
            isFetching: false,
        }),
        [getImportantProducts.success]: (state, {payload}) => ({
            ...state,
            importantProducts: payload,
            isFetching: false,
        }),
        [getProductsAll.success]: (state, {payload}) => ({
            ...state,
            products: payload,
            isFetching: false,
        }),
        [hasProduct.success]: (state, {payload}) => ({
            ...state,
            products: state.products.map((product) =>
                product.id === payload.data.id ? payload.data : product
            ),
            isFetching: false,
        }),
        [filterProducts.success]: (state, {payload}) => ({
            ...state,
            products: payload,
            isFetching: false,
        }),
        [searchProducts.success]: (state, {payload}) => ({
            ...state,
            searchResult: payload,
            isFetching: false,
        }),


        [getProduct.success]: (state, {payload}) => ({
            ...state,
            selectedProduct: payload,
            isFetching: false,
        }),
        [getProduct.request]: (state) => ({
            ...state,
            isFetching: true,
        }),
        [getProduct.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),

        [updateProduct.request]: (state, {payload}) => ({
            ...state,
            isUpdating: true,
        }),
        [updateProduct.success]: (state, {payload}) => ({
            ...state,
            products:state.products.map((product) =>
                product.id === payload.id ? payload : product
            ),
            isUpdating: false,
        }),
        [updateProduct.failure]: (state, {payload}) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),

        [addProduct.success]: (state, {payload}) => ({
            ...state,
            products: [...state.products, payload],
            isAdding: false,
        }),

        [deleteProduct.success]: (state, {payload}) => ({
            ...state,
            products: state.products.filter((product) => product.id !== payload),
            isDeleting: false,
        }),

        [getNewProducts.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getImportantProducts.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getProductsAll.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [filterProducts.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [hasProduct.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [searchProducts.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),

        [addProduct.failure]: (state, {payload}) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),

        [deleteProduct.failure]: (state, {payload}) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default productReducer;
