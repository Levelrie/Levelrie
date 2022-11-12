import { combineReducers } from 'redux';
import admin from './admin.reducer';
import admin_errors from './admin_errors.reducer';
import errors from './errors.reducer';
import outfits from './outfits.reducer';
import user from './user.reducer';
import favorites from './favorites.reducer';
import closetReducer from './closet.reducer';
import cart from './cart.reducer';
import shipping from './shipping.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  admin, // will hace an id, username and clearance level if someone is logged in
  admin_errors, // contains adminRegistrationMessage and adminLoginMessage
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  outfits,
  favorites, // contains favoriteOutfitsReducer and favoriteItemsReducer
  closetReducer, // contains closetOutfitsReducer and closetItemsReducer
  cart, //contains items to purchase
  shipping //contains shipping info (addresses)
});

export default rootReducer;
