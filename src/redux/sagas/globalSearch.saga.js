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

function* favoriteOutfit(action) {
    const outfitId = action.payload;

    try {
        // Uses same route as Home view for swiping right
        yield axios.post(`/api/outfit/favorite`, {outfitId: outfitId});

    } catch (error) {
        console.log('Error in favoriteOutfit in globalSearchSaga', error);
    }
}

function* unfavoriteOutfit(action) {
    const outfitId = action.payload;

    try {
        yield axios.post(`/api/outfit/search/unfavorite`, {outfitId: outfitId});

    } catch (error) {
        console.log('Error in unfavoriteOutfit in globalSearchSaga', error);
    }

}

function* favoriteItem(action) {
    const itemId = action.payload;

    try {
        yield axios.post('/api/item/search/favorite', {itemId: itemId});
    } catch (error) {
        console.log('Error in favoriteItem in globalSearchSaga', error);      
    }
}

function* unfavoriteItem(action) {
    const itemId = action.payload;

    try {
        yield axios.delete(`/api/item/search/unfavorite/${itemId}`);
    } catch (error) {
        console.log('Error in favoriteItem in globalSearchSaga', error);      
    }
}

export default function* globalSearchSaga() {
    yield takeLatest('SAGA_SEARCH_ALL_OUTFITS', searchAllOutfits);
    yield takeLatest('SAGA_SEARCH_ALL_ITEMS', searchAllItems);
    yield takeLatest('SAGA_FAVORITE_OUTFIT_FROM_GLOBAL_SEARCH', favoriteOutfit);
    yield takeLatest('SAGA_UNFAVORITE_OUTFIT_FROM_GLOBAL_SEARCH', unfavoriteOutfit);
    yield takeLatest('SAGA_FAVORITE_ITEM_FROM_GLOBAL_SEARCH', favoriteItem);
    yield takeLatest('SAGA_UNFAVORITE_ITEM_FROM_GLOBAL_SEARCH', unfavoriteItem);
};