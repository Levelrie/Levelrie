import { combineReducers } from 'redux';

const favoriteOutfitsReducer = (state = [], action) => {
    // console.log('in favoriteOutfitsReducer');
    switch (action.type) {
        case 'SET_FAVORITE_OUTFITS':
            return action.payload;
        case 'CLEAR_FAVORITE_OUTFITS':
            return [];
        default:
            return state;
    }
}

const favoriteItemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVORITE_ITEMS':
            return action.payload;
        case 'CLEAR_FAVORITE_ITEMS':
            return [];
        default:
            return state;
    }
}

export default combineReducers({
    favoriteOutfitsReducer,
    favoriteItemsReducer
})