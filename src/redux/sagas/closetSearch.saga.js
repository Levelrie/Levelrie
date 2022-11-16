import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* searchClosetOutfits(action) {
    const query = action.payload;
    const searchResults = yield axios.get(`/api/closet/outfits?q=${query}`);
    console.log(searchResults.data);
    yield put({
        type: 'SET_CLOSET_OUTFITS',
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
        let categoryResults = yield axios.get(`/api/closet/items/category/${categories[i]}?q=${query}`);
        searchResults = searchResults.concat(categoryResults.data);
    }
    console.log(searchResults);
    yield put({
        type: 'SET_CLOSET_ITEMS',
        payload: searchResults
    });
}

export default function* globalSearchSaga() {
    yield takeLatest('SAGA_SEARCH_CLOSET_OUTFITS', searchClosetOutfits);
    yield takeLatest('SAGA_SEARCH_CLOSET_ITEMS', searchClosetItems)
};