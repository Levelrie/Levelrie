import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* favoriteItem(action) {
    console.log('WOOOOO', action.payload);
    try {
        yield axios.post(`/api/item/favorite`, action.payload);
    } catch (error) {
        console.log('itemsSaga favoriteItem function error', error);
    }
}

function* unfavoriteItem(action) {
    console.log(action.payload);
    try {
        const itemId = action.payload.itemId;
        const outfitId = action.payload.outfitId;
        console.log('OUTFIT ID', outfitId)
        yield axios.delete(`/api/item/unfavorite/${itemId}/${outfitId}`);
    } catch (error) {
        console.log('itemsSaga favoriteItem function error', error);
    }
}

export default function* itemsSaga() {
    yield takeLatest('SAGA_FAVORITE_ITEM', favoriteItem);
    yield takeLatest('SAGA_UNFAVORITE_ITEM', unfavoriteItem);
}