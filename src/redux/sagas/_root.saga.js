import { all } from 'redux-saga/effects';
import adminLoginSaga from './admin_login.saga';
import adminRegistrationSaga from './admin_registration.saga';
import adminSaga from './admin.saga';
import loginSaga from './login.saga';
import outfitsSaga from './outfits.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import itemsSaga from './items.saga';
import favoritesSaga from './favorites.saga';
import closetSaga from './closet.saga';
import cart from './cart.saga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    adminLoginSaga(), // login saga is now registered
    adminRegistrationSaga(),
    adminSaga(),
    loginSaga(),
    outfitsSaga(),
    registrationSaga(),
    userSaga(),
    itemsSaga(),
    favoritesSaga(),
    closetSaga(),
    cart()
  ]);
}
