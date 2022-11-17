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

function* decreasedItemQuantity(action) {
    const itemId = action.payload.id;
    const qty = action.payload.qtyToRemove;
    const category = action.payload.category;

    try {
        yield axios.delete(`/api/favorites/items/decrease/${itemId}/${qty}`);
        yield put({
            type: 'FETCH_FAVORITE_ITEMS',
            payload: category
        });

    } catch (error) {
        console.log('error in decreaseItemQuantity function in favoritesSaga:', error); 
    }
}

function* increaseItemQuantity(action) {
    const itemId = action.payload.id;
    const qty = action.payload.qtyToAdd;
    const category = action.payload.category;

    try {
        yield axios.post(`/api/favorites/items/increase`, {itemId: itemId, qty: qty});
        yield put({
            type: 'FETCH_FAVORITE_ITEMS',
            payload: category
        });

    } catch (error) {
        console.log('error in increaseItemQuantity function in favoritesSaga:', error); 
    }
}

export default function* favoritesSaga() {
    yield takeLatest('FETCH_FAVORITE_OUTFITS', fetchFavoriteOutfits);
    yield takeLatest('FETCH_FAVORITE_ITEMS', fetchFavoriteItems);
    yield takeLatest('SAGA_DECREASE_FAVE_QUANTITY', decreasedItemQuantity);
    yield takeLatest('SAGA_INCREASE_FAVE_QUANTITY', increaseItemQuantity);
};