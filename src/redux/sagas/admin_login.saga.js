import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN_ADMIN" actions
function* adminLogin(action) {
  try {
    // clear any existing error on the login page
    yield put({ type: 'CLEAR_ADMIN_LOGIN_ERROR' });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the admin
    console.log('admin login pre-post in saga: 1');
    yield axios.post('/api/admin/login', action.payload, config);
    console.log('admin login post-post in saga: 2');
    console.log('action.payload: 2:', action.payload);
    // after the admin has logged in
    // get the admin information from the server
    yield put({ type: 'FETCH_ADMIN' });
  } catch (error) {
    console.log('Error with admin login:', error);
    if (error.response.status === 401) {
      // The 401 is the error status sent from passport
      // if admin isn't in the database or
      // if the username and password don't match in the database
      yield put({ type: 'ADMIN_LOGIN_FAILED' });
    } else {
      // Got an error that wasn't a 401
      // Could be anything, but most common cause is the server is not started
      yield put({ type: 'ADMIN_LOGIN_FAILED_NO_CODE' });
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* adminLogout(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session
    yield axios.post('/api/admin/logout', config);

    // now that the session has ended on the server
    // remove the client-side admin object to let
    // the client-side code know the admin is logged out
    yield put({ type: 'UNSET_ADMIN' });
  } catch (error) {
    console.log('Error with admin logout:', error);
  }
}

function* adminLoginSaga() {
  yield takeLatest('ADMIN_LOGIN', adminLogin);
  yield takeLatest('ADMIN_LOGOUT', adminLogout);
}

export default adminLoginSaga;