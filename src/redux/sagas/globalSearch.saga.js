import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* searchAllOutfits(action) {
    const query = action.payload;
    const searchResults = yield axios.get(`/api/outfit/search?q=${query}`);
    console.log(searchResults.data);
    yield put({
        type: 'SET_SEARCH_RESULTS',
        payload: searchResults.data
    });
}

function* searchAllItems(action) {
    const query = action.payload.query;
    const categories = action.payload.categories;
    let searchResults = [];

    // Get results for each individual category
    // Concat results into a single array
    for (let i = 0; i < categories.length; i++) {
        let categoryResults = yield axios.get(`/api/item/search?q=${query}&cat=${categories[i]}`);
        searchResults = searchResults.concat(categoryResults.data);
    }
    console.log(searchResults);
    yield put({
        type: 'SET_SEARCH_RESULTS',
        payload: searchResults
    });
}

export default function* globalSearchSaga() {
    yield takeLatest('SAGA_SEARCH_ALL_OUTFITS', searchAllOutfits);
    yield takeLatest('SAGA_SEARCH_ALL_ITEMS', searchAllItems)
};