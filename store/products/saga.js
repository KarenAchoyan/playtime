import {takeLatest, call, put} from 'redux-saga/effects';
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
    getImportantProducts,
    getNewProducts,
    getProductsCategories,
} from './actions';
import axiosInstance from 'configs/axiosIntance';

// Product Sagas
function* fetchProductsSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/products', payload));
        const products = response.data.data;
        yield put(getProducts.success(products));
    } catch (error) {
        yield put(getProducts.failure(error.message));
    }
}
function* fetchImportantProducts({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/products/importants', payload));
        const products = response.data.data;
        yield put(getImportantProducts.success(products));
    } catch (error) {
        yield put(getImportantProducts.failure(error.message));
    }
}
function* fetchNewProducts({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/products/newProducts', payload));
        const products = response.data.data;
        yield put(getNewProducts.success(products));
    } catch (error) {
        yield put(getNewProducts.failure(error.message));
    }
}
function* fetchProductsAllSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/products/all', payload));
        const products = response.data.data;
        yield put(getProducts.success(products));
    } catch (error) {
        yield put(getProducts.failure(error.message));
    }
}

function* fetchSearchProductsSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/products/search?query=' + payload.query, payload));
        const products = response.data;
        yield put(searchProducts.success(products));
    } catch (error) {
        yield put(searchProducts.failure(error.message));
    }
}

function* fetchFilterProducts({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get(`/products/filter/${payload.id}?min=${payload.min}&max=${payload.max}&categories=${payload.categories}`, payload));
        const products = response.data.data;
        yield put(filterProducts.success(products));
    } catch (error) {
        yield put(filterProducts.failure(error.message));
    }
}

function* fetchProductSaga(action) {
    try {
        const {id} = action.payload;
        const product = yield call(() => axiosInstance.get(`/products/${id}`, action.payload));
        yield put(getProduct.success(product));
    } catch (error) {
        yield put(getProduct.failure(error.message));
    }
}
function* fetchProductCategoriesSaga(action) {
    try {
        const {id} = action.payload;
        const response = yield call(() => axiosInstance.get(`/products/categories/${id}`, action.payload));
        const products = response.data.data;
        yield put(getProductsCategories.success(products));
    } catch (error) {
        yield put(getProductsCategories.failure(error.message));
    }
}

function* fetchHasProduct(action) {
    try {
        const {id} = action.payload;
        const product = yield call(() => axiosInstance.get(`/products/has/${id}`, action.payload));
        yield put(hasProduct.success(product.data));
    } catch (error) {
        yield put(hasProduct.failure(error.message));
    }
}

function* addProductSaga(action) {

    try {
        const newProduct = yield call(() => axiosInstance.post('/products', action.payload));
        yield put(addProduct.success(newProduct));
    } catch (error) {
        yield put(addProduct.failure(error.message));
    }
}

function* updateProductSaga(action) {
    try {
        const {id, formData} = action.payload;

        const updatedProduct = yield call(() => axiosInstance.post(`/products/${id}`,formData));
        yield put(updateProduct.success(updatedProduct.data.data));
    } catch (error) {
        yield put(updateProduct.failure(error.message));
    }
}

function* deleteProductSaga(action) {
    try {
        const {payload: productId} = action;
        yield call(() => axiosInstance.delete(`/products/${productId}`));
        yield put(deleteProduct.success(productId));
    } catch (error) {
        yield put(deleteProduct.failure(error.message));
    }
}

export function* productSaga() {
    yield takeLatest(getProducts.request, fetchProductsSaga);
    yield takeLatest(filterProducts.request, fetchFilterProducts);
    yield takeLatest(searchProducts.request, fetchSearchProductsSaga);
    yield takeLatest(getProduct.request, fetchProductSaga);
    yield takeLatest(addProduct.request, addProductSaga);
    yield takeLatest(updateProduct.request, updateProductSaga);
    yield takeLatest(deleteProduct.request, deleteProductSaga);
    yield takeLatest(hasProduct.request, fetchHasProduct);
    yield takeLatest(getProductsAll.request, fetchProductsAllSaga);
    yield takeLatest(getNewProducts.request, fetchNewProducts);
    yield takeLatest(getImportantProducts.request, fetchImportantProducts);
    yield takeLatest(getProductsCategories.request, fetchProductCategoriesSaga);
}
