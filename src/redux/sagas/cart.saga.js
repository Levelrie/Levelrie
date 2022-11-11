import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* cartItem(action) {
    console.log('WOOOOO', action.payload);
    try {
        yield axios.post(`/api/cart`, action.payload);
    } catch (error) {
        console.log('itemsSaga favoriteItem function error', error);
    }
}

function* fetchCart(){
    try {
        const cartRes = yield axios({
            method: 'GET',
            url: 'api/cart'
        })
        console.log('cartRes', cartRes.data)
        yield put({
            
            type: 'SET_CART_ITEMS',
            payload: cartRes.data
        })
    }
    catch(error) {
        console.log('error getting cart items:', error);
    }
}


function* unCartItem(action) {
    console.log(action.payload);
    try {
        const itemId = action.payload.itemId;
        console.log('OUTFIT ID')
        yield axios.delete(`/api/item/unfavorite/${itemId}`);
    } catch (error) {
        console.log('itemsSaga favoriteItem function error', error);
    }
}

export default function* itemsSaga() {
    yield takeEvery('SAGA_ADDCART_ITEM', cartItem);
    yield takeEvery('SAGA_UNCART_ITEM', unCartItem);
    yield takeEvery('GET_CART_ITEMS', fetchCart)
}