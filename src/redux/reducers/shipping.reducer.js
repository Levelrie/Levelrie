import { combineReducers } from 'redux';

const shippingReducer = (state = [], action) => {
    console.log('in shippingReducer');
    switch (action.type) {
        case 'SET_ADDRESS':
            console.log('action.payload in shipping reducer', action.payload)
            return action.payload;
        case 'CLEAR_ADDRESS':
            return [];
        default:
            return state;
    }
}

const favoriteAddyReducer = (state=[], action) => {
    console.log('is this thing on???')
    switch (action.type) {
        case 'SET_FAVORITE_ADDY':
            console.log('Addy in fav addy', action.payload)
            return action.payload;
        default:
            return state;
    }
}



export default combineReducers({
shippingReducer,
favoriteAddyReducer})
