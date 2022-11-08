import { combineReducers } from 'redux';

// adminLoginMessage holds the string that will display
// on the login screen if there's an error
const adminLoginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_ADMIN_LOGIN_ERROR':
      return '';
    case 'ADMIN_LOGIN_INPUT_ERROR':
      return 'Enter your username and password!';
    case 'ADMIN_LOGIN_FAILED':
      return "Oops! The username and password didn't match. Try again!";
    case 'ADMIN_LOGIN_FAILED_NO_CODE':
      return 'Oops! Something went wrong! Is the server running?';
    default:
      return state;
  }
};

// adminRegistrationMessage holds the string that will display
// on the registration screen if there's an error
const adminRegistrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_ADMIN_REGISTRATION_ERROR':
      return '';
    case 'ADMIN_REGISTRATION_INPUT_ERROR':
      return 'Choose a username and password!';
    case 'ADMIN_REGISTRATION_FAILED':
      return "Oops! That didn't work. The username might already be taken. Try again!";
    default:
      return state;
  }
};

// make one object that has keys adminLoginMessage, adminRegistrationMessage
// these will be on the redux state at:
// state.errors.adminLoginMessage and state.errors.adminRegistrationMessage
export default combineReducers({
  adminLoginMessage,
  adminRegistrationMessage,
});
