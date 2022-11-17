import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchOutfits() {
    try {
        const outfits = yield axios.get(`/api/outfit/home`);

        // Send the last outfit in the array to be displayed in the front
        // yield put({
        //     type: 'SET_HOME_SWIPE_OUTFIT',
        //     payload: outfits.data[(outfits.data.length - 1)]
        // })

        // Remove the last outfit that was already sent
        let fits = outfits.data;
        // backgroundFits.pop();

        // Send the rest to be displayed as fake cards in the back
        yield put({
            type: 'SET_HOME_OUTFITS',
            payload: fits
        });
    } catch (error) {
        console.log('outfitsSaga fetchOutfits function error', error);
    }
}

function* rejectOutfit(action) {
    try {

        let outfitIds = action.payload;

        outfitIds = outfitIds.filter(function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });

        for (let i = 0; i < outfitIds.length; i++) {
            yield axios.post(`/api/outfit/reject`, {outfitId: outfitIds[i]});
        }
 
        yield put({
            type: 'SAGA_FETCH_OUTFITS_FOR_SWIPING'
        });  

        // Since swipes from home don't trigger a database update until visiting another page 
        // Closet and Favorites must be send for incase a user immediately visits one of those pages
        yield put({
            type: 'FETCH_FAVORITE_OUTFITS'
        });

        dispatch({
            type: 'FETCH_CLOSET_OUTFITS'
        });
            
    } catch (error) {
        console.log('outfitsSaga rejectOutfit function error', error);
    }
}

function* favoriteOutfit(action) {
    try {
        let outfitIds = action.payload;

        console.log('ARRAY TO FAVORITE', outfitIds)

        outfitIds = outfitIds.filter(function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });

        console.log('ARRAY TO FAVORITE 2', outfitIds)

        for (let i = 0; i < outfitIds.length; i++) {
            yield axios.post(`/api/outfit/favorite`, {outfitId: outfitIds[i]});
        }

        yield put({
            type: 'SAGA_FETCH_OUTFITS_FOR_SWIPING'
        });

        // Since swipes from home don't trigger a database update until visiting another page 
        // Closet and Favorites must be send for incase a user immediately visits one of those pages
        yield put({
            type: 'FETCH_FAVORITE_OUTFITS'
        });

        dispatch({
            type: 'FETCH_CLOSET_OUTFITS'
        });

    } catch (error) {
        console.log('outfitsSaga favoriteOutfit function error', error);
    }
}


export default function* outfitsSaga() {
    yield takeLatest('SAGA_FETCH_OUTFITS_FOR_SWIPING', fetchOutfits);
    yield takeLatest('SAGA_REJECT_OUTFITS', rejectOutfit);
    yield takeLatest('SAGA_FAVORITE_OUTFITS', favoriteOutfit);
}