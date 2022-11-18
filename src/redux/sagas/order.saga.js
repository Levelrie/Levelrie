import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchOrder(){
    try{
        const order = yield axios({
            method: 'GET',
            url: 'api/buy'
        })
        console.log('order', order)
        yield put({
            type: 'SET_ORDERED_ITEMS',
            payload: order.data
        })
    }catch(error){
        console.log('ERROR in fetchOrder', error)
    }
}

export default function* orderSaga(){
yield takeEvery('FETCH_ORDER', fetchOrder)
}