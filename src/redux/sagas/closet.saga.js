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
        // console.log('what is', closetOutfitsRes.data);
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
function* fetchClosetItems (action) {
    const categoryItems = action.payload;
    // console.log('what is action.payload', categoryItems);
    try {
        const closetItemRes = yield axios({
            method: 'GET',
            url: `/api/closet/items/category/${categoryItems}`,
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

function* fetchClosetOutfitDetails (action) {
    const outfitId = action.payload;
    // console.log('what is outfitId', outfitId);
    try {
        const closetOutfitDetails = yield axios({
            method: 'GET',
            url: `/api/closet/outfits/${outfitId}`
        })
        yield put({
            type: 'SET_CLOSET_OUTFIT_DETAILS',
            payload: closetOutfitDetails.data
        })
    }        
    catch(error) {
            console.log('error getting closet outfit details:', error);
    }
}

function* fetchCategory () {
    try {
        const closetCategory = yield axios({
            method: 'GET',
            url: `/api/closet/items/category`
        })
        yield put({
            type: 'SET_CATEGORY_NAMES',
            payload: closetCategory.data
        })
    }        
    catch(error) {
            console.log('error getting closet category:', error);
    }
}

export default function* closetSaga() {
    yield takeLatest('FETCH_CLOSET_OUTFITS', fetchClosetOutfits);
    yield takeLatest('FETCH_CLOSET_ITEMS', fetchClosetItems);
    yield takeLatest('FETCH_CLOSET_OUTFIT_DETAILS', fetchClosetOutfitDetails);
    yield takeLatest('FETCH_CATEGORY', fetchCategory);
};