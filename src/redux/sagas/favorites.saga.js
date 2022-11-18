import { put, takeLatest, takeEvery } from 'redux-saga/effects';
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
// STARTED THE SAGA BELOW:
// function* fetchFavoriteOutfitDetails(action) {
//     console.log('in fetchFavoriteOutfitDetails');
//     const outfitToPull = action.payload;
//     try {
//         const favoriteOutfitDetailsRes = yield axios({
//             method: 'GET',

//         })
//     }
// }

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

        for (let i = 0; i < favoriteItemsRes.data.length; i++) {
            // Dispatch item.name here that fetches all existing color/size data for this item
            yield put({
                type: 'SAGA_FETCH_ITEM_SIZES',
                payload: favoriteItemsRes.data[i].name
            });
    
            yield put({
                type: 'SAGA_FETCH_ITEM_COLORS',
                payload: favoriteItemsRes.data[i].name
            });

        }

        
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

function* fetchItemSizes(action) {
    const itemName = action.payload;
    
    try {

        const sizes = yield axios.get(`/api/favorites/item/sizes?name=${itemName}`);
        console.log("SIZES", sizes.data);


        yield put ({
            type: 'SET_ITEM_SIZES',
            payload: sizes.data
        });

    } catch (error) {
        console.log('error in fetchItemSizes function in favoritesSaga:', error); 
    }
}

function* fetchItemColors(action) {

    const itemName = action.payload;
    
    try {
        const colors = yield axios.get(`/api/favorites/item/colors?name=${itemName}`);
        console.log("colors", colors.data);

        // Then set reducer
        yield put ({
            type: 'SET_ITEM_COLORS',
            payload: colors.data
        });

    } catch (error) {
        console.log('error in fetchItemColors function in favoritesSaga:', error); 
    }

}

function* changeItemColor(action) {
    const item = action.payload.item;
    const newColor = action.payload.newColor;

    try {
        yield axios.put('/api/item/changecolor', {item: item, newColor: newColor});

    } catch (error) {
        console.log('error in changeItemColor function in favoritesSaga:', error); 
    }
}

function* changeItemSize(action) {
    const item = action.payload.item;
    const newSize = action.payload.newSize;

    try {
        yield axios.put('/api/item/changesize', {item: item, newSize: newSize});

    } catch (error) {
        console.log('error in changeItemSize function in favoritesSaga:', error); 
    }
}

function* fetchOccasions() {
    try {
        const occasionRes = yield axios({
            method: 'GET',
            url: `/api/favorites/occasions`
        })
        yield put({
            type: 'SET_OCCASIONS',
            payload: occasionRes.data
        })
    }
    catch(error) {
        console.log('error in saga fetchOccasions:', error);

    }
}

export default function* favoritesSaga() {
    yield takeLatest('FETCH_FAVORITE_OUTFITS', fetchFavoriteOutfits);
    yield takeLatest('FETCH_FAVORITE_ITEMS', fetchFavoriteItems);
    yield takeLatest('SAGA_DECREASE_FAVE_QUANTITY', decreasedItemQuantity);
    yield takeLatest('SAGA_INCREASE_FAVE_QUANTITY', increaseItemQuantity);
    yield takeEvery('SAGA_FETCH_ITEM_SIZES', fetchItemSizes);
    yield takeEvery('SAGA_FETCH_ITEM_COLORS', fetchItemColors);
    yield takeLatest('SAGA_CHANGE_ITEM_COLOR', changeItemColor);
    yield takeLatest('SAGA_CHANGE_ITEM_SIZE', changeItemSize);
    // yield takeLatest('FETCH_FAVORITE_OUTFIT_DETAILS', fetchFavoriteOutfitDetails);
    yield takeLatest('FETCH_OCCASIONS', fetchOccasions);
};