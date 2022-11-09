import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER_ADMIN" actions
function* adminRegister(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_ADMIN_REGISTRATION_ERROR' });

    // passes the admins information (username, password) from the payload to the server
    yield axios.post('/api/admin/register', action.payload);

    // automatically log a admin in after registration
    yield put({ type: 'ADMIN_LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_ADMIN_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with admin registration:', error);
    yield put({ type: 'ADMIN_REGISTRATION_FAILED' });
  }
}

function* adminRegistrationSaga() {
  yield takeLatest('ADMIN_REGISTER', adminRegister);
}

export default adminRegistrationSaga;
