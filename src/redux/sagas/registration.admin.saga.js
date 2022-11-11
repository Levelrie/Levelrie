import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerAdminUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the users information (username, password, firstName, lastName, Email) from the payload to the server
    yield axios.post('/api/admin/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN_ADMIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationAdminSaga() {
  yield takeLatest('REGISTER_ADMIN', registerAdminUser);
}

export default registrationAdminSaga;
