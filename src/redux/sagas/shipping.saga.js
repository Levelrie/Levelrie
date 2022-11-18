import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* addShipping(action) {
    console.log('WOOOOO', action.payload);
    try {
        yield axios.post(`/api/shipping`, action.payload);
    } catch (error) {
        console.log('shippingSaga function error', error);
    }
}

function* fetchShipping(){
    try {
        const shippingRes = yield axios({
            method: 'GET',
            url: 'api/shipping'
        })
        console.log('shippingRes', shippingRes.data[0])
        for(let addy of shippingRes.data){
            if(addy.preferred === true){
                yield put({
                    type: 'SET_FAVORITE_ADDY',
                    payload: addy
                })
            }
        }
        yield put({
            type: 'SET_ADDRESS',
            payload: shippingRes.data[0]
        })
          
    }
    catch(error) {
        console.log('error getting shipping items:', error);
    }
}


function* removeShipping(action) {
    console.log(action.payload);
    try {
        const addressId = action.payload.addressId;
        console.log('adress ID', addressId)
        yield axios.delete(`/api/shipping/${addressId}`);
    } catch (error) {
        console.log('shipping saga function error', error);
    }
}

export default function* itemsSaga() {
    yield takeEvery('SAGA_ADD_SHIPPING', addShipping);
    yield takeEvery('SAGA_REMOVE_SHIPPING', removeShipping);
    yield takeEvery('GET_SHIPPING', fetchShipping)
}