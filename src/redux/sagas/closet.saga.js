import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// This saga function will be use to fetch all closets outfits and 
// store it in the closet reducer. 
function* fetchClosetOutfits () {
    // console.log('in closetOutfits saga')
    try {
        const closetOutfitsRes = yield axios({
            method: 'GET',
            url: '/api/closet/outfits'
        })
        yield put({
            type: 'SET_CLOSET_OUTFITS',
            payload: closetOutfitsRes.data
        })
    }
    catch(error) {
        console.log('error getting closet outfits:', error);
    }
} // end of fetchClosetOutfits

// This saga function will be use to fetch all closets items and 
// store it in the closet reducer. 
function* fetchClosetItems () {
    try {
        const closetItemRes = yield axios({
            method: 'GET',
            url: '/api/closet/items'
        })
        yield put({
            type: 'SET_CLOSET_ITEMS',
            payload: closetItemRes.data
        })
    }
    catch(error) {
        console.log('error getting closet items:', error);
    }
} // end of fetchClosetItems

export default function* closetSaga() {
    yield takeLatest('FETCH_CLOSET_OUTFITS', fetchClosetOutfits);
    yield takeLatest('FETCH_CLOSET_ITEMS', fetchClosetItems);
};