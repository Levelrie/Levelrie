import { combineReducers } from 'redux';
import admin from './admin.reducer';
import errors from './errors.reducer';
import outfits from './outfits.reducer';
import user from './user.reducer';
import favorites from './favorites.reducer';
import closetReducer from './closet.reducer';
import cart from './cart.reducer';
import shipping from './shipping.reducer'
import categories from './categories.reducer';
import searchResultsReducer from './searchResults.reducer';
import items from './items.reducer';
import outerwear from './outerwear.reducer';
import top from './top.reducer';
import accessory from './accessory.reducer';
import bottom from './bottom.reducer';
import footwear from './footwear.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  admin, // will hace an id, username and clearance level if someone is logged in
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  outfits,
  favorites, // contains favoriteOutfitsReducer, favoriteItemsReducer, and occasionsReducer
  closetReducer, // contains closetOutfitsReducer and closetItemsReducer
  cart, //contains items to purchase
  shipping, //contains shipping info (addresses)
  categories, // Stores category names
  items,
  outerwear,
  top,
  accessory,
  bottom,
  footwear,
  searchResultsReducer,
});

export default rootReducer;
