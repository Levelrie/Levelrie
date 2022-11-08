import { combineReducers } from 'redux';
import admin from './admin.reducer';
import admin_errors from './admin_errors.reducer';
import errors from './errors.reducer';
import outfits from './outfits.reducer';
import user from './user.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  admin, // will hace an id, username and clearance level if someone is logged in
  admin_errors, // contains adminRegistrationMessage and adminLoginMessage
  errors, // contains registrationMessage and loginMessage
  outfits,  
  user // will have an id and username if someone is logged in
});

export default rootReducer;
