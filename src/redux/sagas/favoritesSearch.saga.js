import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* searchClosetOutfits(action) {
    const query = action.payload;
    const searchResults = yield axios.get(`/api/favorites/search?q=${query}`);
    console.log('RESULTS!', searchResults.data);
    yield put({
        type: 'SET_FAVORITE_OUTFITS',
        payload: searchResults.data
    });
}

function* searchClosetItems(action) {
    const query = action.payload.query;
    const categories = action.payload.categories;
    let searchResults = [];

    // Get results for each individual category
    // Concat results into a single array
    for (let i = 0; i < categories.length; i++) {
        let categoryResults = yield axios.get(`/api/favorites/search/item?q=${query}&cat=${categories[i]}`);
        searchResults = searchResults.concat(categoryResults.data);
    }
    console.log(searchResults);
    yield put({
        type: 'SET_FAVORITE_ITEMS',
        payload: searchResults
    });
}

export default function* FavoritesSearchSaga() {
    yield takeLatest('SAGA_SEARCH_FAVORITE_OUTFITS', searchClosetOutfits);
    yield takeLatest('SAGA_SEARCH_FAVORITE_ITEMS', searchClosetItems)
};