import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchOutfits() {
    try {
        const outfits = yield axios.get(`/api/outfit/home`);
        yield put({
            type: 'SET_HOME_OUTFITS',
            payload: outfits.data
        });
    } catch (error) {
        console.log('outfitsSaga fetchOutfits function', error);
    }
}

function* rejectOutfit() {

}

function* favoriteOutfit() {
    
}


export default function* outfitsSaga() {
    yield takeLatest('SAGA_FETCH_OUTFITS_FOR_SWIPING', fetchOutfits);
    yield takeLatest('SAGA_REJECT_OUTFIT', rejectOutfit);
    yield takeLatest('SAGA_FAVORITE_OUTFIT', favoriteOutfit);
}