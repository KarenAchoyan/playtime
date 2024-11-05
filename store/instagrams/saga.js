import { takeLatest, call, put } from 'redux-saga/effects';
import { getPosts, getPost, addPost, updatePost, deletePost } from './actions';
import axiosInstance from 'configs/axiosIntance';
import {debug} from "util";

// Post Sagas
function* fetchPostsSaga({ payload = {} }) {
  try {
    const response = yield call(() => axiosInstance.get('/posts', payload));
    const posts = response.data;
    yield put(getPosts.success(posts));
  } catch (error) {
    yield put(getPosts.failure(error.message));
  }
}

function* fetchPostSaga(action) {
  try {
    const { id } = action.payload;
    const post = yield call(() => axiosInstance.get(`/posts/${id}`, action.payload));
    yield put(getPost.success(post));
  } catch (error) {
    yield put(getPost.failure(error.message));
  }
}

function* addPostSaga(action) {
  try {
    const newPost = yield call(() => axiosInstance.post('/posts', action.payload));
    yield put(addPost.success(newPost));
  } catch (error) {
    yield put(addPost.failure(error.message));
  }
}

function* updatePostSaga(action) {
  try {
    const { id } = action.payload;
    const updatedPost = yield call(() => axiosInstance.post(`/posts/${id}`, action.payload.formData));
    yield put(updatePost.success(updatedPost));
  } catch (error) {
    yield put(updatePost.failure(error.message));
  }
}

function* deletePostSaga(action) {
  try {
    const { payload: postId } = action;
    yield call(() => axiosInstance.delete(`/posts/${postId}`));
    yield put(deletePost.success(postId));
  } catch (error) {
    yield put(deletePost.failure(error.message));
  }
}

// Post Watcher Saga
export function* postSaga() {
  yield takeLatest(getPosts.request, fetchPostsSaga);
  yield takeLatest(getPost.request, fetchPostSaga);
  yield takeLatest(addPost.request, addPostSaga);
  yield takeLatest(updatePost.request, updatePostSaga);
  yield takeLatest(deletePost.request, deletePostSaga);
}
