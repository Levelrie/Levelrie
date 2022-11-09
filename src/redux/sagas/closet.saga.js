import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// This saga function will be use to fetch all closets outfits and 
// store it in the closet outfit reducer. 
function* fetchClosetOutfits () {
    console.log('in closetOutfits saga')
    try {
        const closetOutfitsRes = yield axios({
            method: 'GET',
            url: '/api/closet/oufits'
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

export default function* closetSaga() {
    yield takeLatest('FETCH_CLOSET_OUTFITS', fetchClosetOutfits);
};