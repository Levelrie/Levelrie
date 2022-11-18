import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFavoriteOutfits() {
    console.log('in fetchFavoriteOutfits saga')
    try {
        const favoriteOutfitsRes = yield axios({
            method: 'GET',
            url: '/api/favorites/outfits'
        })
        yield put({
            type: 'SET_FAVORITE_OUTFITS',
            payload: favoriteOutfitsRes.data
        })
    }
    catch(error) {
        console.log('error getting favorite outfits:', error);
    }
}
// STARTED THE SAGA BELOW:
// function* fetchFavoriteOutfitDetails(action) {
//     console.log('in fetchFavoriteOutfitDetails');
//     const outfitToPull = action.payload;
//     try {
//         const favoriteOutfitDetailsRes = yield axios({
//             method: 'GET',

//         })
//     }
// }

function* fetchFavoriteItems(action) {
    const category = action.payload
    try {
        const favoriteItemsRes = yield axios({
            method: 'GET',
            url: `/api/favorites/items/${category}`
        })
        yield put({
            type: 'SET_FAVORITE_ITEMS',
            payload: favoriteItemsRes.data
        })
    }
    catch(error) {
        console.log('error getting favorite items:', error);
    }
}

function* fetchOccasions() {
    try {
        const occasionRes = yield axios({
            method: 'GET',
            url: `/api/favorites/occasions`
        })
        yield put({
            type: 'SET_OCCASIONS',
            payload: occasionRes.data
        })
    }
    catch(error) {
        console.log('error in saga fetchOccasions:', error);
    }
}

function* fetchFavoriteOutfitsForOccasion(action) {
    const occasionId = action.payload
    try {
        const favoriteItemsRes = yield axios({
            method: 'GET',
            url: `/api/favorites/outfits/${occasionId}`
        })
        yield put({
            type: 'SET_FAVORITE_OUTFITS_FOR_OCCASION',
            payload: favoriteItemsRes.data
        })
    }
    catch(error) {
        console.log('error getting favorite outfits for occasion:', error);
    }
}

export default function* favoritesSaga() {
    yield takeLatest('FETCH_FAVORITE_OUTFITS', fetchFavoriteOutfits);
    yield takeLatest('FETCH_FAVORITE_ITEMS', fetchFavoriteItems);
    // yield takeLatest('FETCH_FAVORITE_OUTFIT_DETAILS', fetchFavoriteOutfitDetails);
    yield takeLatest('FETCH_OCCASIONS', fetchOccasions);
    yield takeLatest('FETCH_FAVORITE_OUTFITS_FOR_OCCASION', fetchFavoriteOutfitsForOccasion);
};