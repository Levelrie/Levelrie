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



export default shippingReducer
