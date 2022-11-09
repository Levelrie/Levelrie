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
            payload: favoriteOutfitsRes
        })
    }
    catch(error) {
        console.log('error getting favorite outfits:', error);
    }
}

function* fetchFavoriteItems() {
    try {
        const favoriteItemsRes = yield axios({
            method: 'GET',
            url: '/favorites/items'
        })
        yield put({
            type: 'SET_FAVORITE_ITEMS',
            payload: favoriteItemsRes
        })
    }
    catch(error) {
        console.log('error getting favorite items:', error);
    }
}

export default function* favoritesSaga() {
    yield takeLatest('FETCH_FAVORITE_OUTFITS', fetchFavoriteOutfits);
    yield takeLatest('FETCH_FAVORITE_ITEMS', fetchFavoriteItems);
};