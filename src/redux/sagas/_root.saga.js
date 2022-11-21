import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import outfitsSaga from './outfits.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import itemsSaga from './items.saga';
import favoritesSaga from './favorites.saga';
import closetSaga from './closet.saga';
import cart from './cart.saga';
import shipping from './shipping.saga';
import outfitsDisplaySaga from './outfit.display.saga';
import globalSearchSaga from './globalSearch.saga';
import ClosetSearchSaga from './closetSearch.saga';
import FavoritesSearchSaga from './favoritesSearch.saga';
import designSaga from './design.saga';
import occasionsSaga from './occasions.saga';
import orderSaga from './order.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    outfitsSaga(),
    registrationSaga(),
    userSaga(),
    itemsSaga(),
    favoritesSaga(),
    closetSaga(),
    globalSearchSaga(),
    cart(),
    shipping(),
    outfitsDisplaySaga(),
    ClosetSearchSaga(),
    FavoritesSearchSaga(),
    designSaga(),
    occasionsSaga(),
    orderSaga()
  ]);
}
