import { combineReducers } from 'redux';

// Closet Outfit Reducer
const closetOutfitsReducer = (state = [], action) => {
    // console.log('in closetOutfitsReducer');
    switch (action.type) {
        case 'SET_CLOSET_OUTFITS':
            return action.payload;
        default:
            return state;
    }
} // end of closetOutfitsReducer

// Closet Item Reducer 
const closetItemReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLOSET_ITEMS':
            return action.payload;
        default:
            return state;
    }
} // end of closetItemReducer

export default combineReducers({
    closetOutfitsReducer,
    closetItemReducer,
})