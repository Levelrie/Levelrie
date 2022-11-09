import { combineReducers } from 'redux';

const closetOutfitsReducer = (state = [], action) => {
    console.log('in closetOutfitsReducer');
    switch (action.type) {
        case 'SET_CLOSET_OUTFITS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    closetOutfitsReducer,
})