import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* cartItem(action) {
    console.log('WOOOOO', action.payload);
    try {
        console.log('action.payload cart', action.payload)
        yield axios.post(`/api/cart`, action.payload);
    } catch (error) {
        console.log('itemsSaga favoriteItem function error', error);
    }
}

function* cartOutfit(action){
    console.log('outfit in cartOutfit', action.payload)
    try {
        yield axios.post('/api/cart/outfit', action.payload)
    } catch (error) {
        console.log('error in cartOutfit POST', error)
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
        console.log('action.payload', action.payload)
        const itemId = action.payload.id;
        console.log('id in delete', itemId)
        console.log('OUTFIT ID')
        yield axios.delete(`/api/cart/${itemId}`);
        yield put({
            type: 'GET_CART_ITEMS'
        })
    } catch (error) {
        console.log('cartSaga Delete Item function error', error);
    }
}

function* clearCart() {
   try { yield axios.delete(`/api/buy`);
    yield put({
        type: 'GET_CART_ITEMS'
    })
} catch (error) {
    console.log('cartSaga Clear Cart function error', error);
}

}

function* buyCart() {
    try {
        yield axios({
            method: 'PUT',
            url: '/api/buy'})
        yield put({
            type: 'CLEAR_CART'
        })
    } catch(error){
        console.log('ERROR IN buyCart', error)
    }
}

export default function* cartSaga() {
    yield takeEvery('SAGA_ADDCART_ITEM', cartItem);
    yield takeEvery('SAGA_UNCART_ITEM', unCartItem);
    yield takeEvery('GET_CART_ITEMS', fetchCart)
    yield takeEvery('CLEAR_CART', clearCart)
    yield takeEvery('BUY_CART', buyCart)
    yield takeEvery('SAGA_ADDCART_OUTFIT', cartOutfit)
    
}