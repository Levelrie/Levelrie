import { combineReducers } from 'redux';

// Closet Outfit Reducer
const closetOutfitsReducer = (state = [], action) => {
    // console.log('in closetOutfitsReducer');
    // console.log('what is out action.payload', action.payload);
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
        case 'CLEAR_CLOSET_ITEMS':
            return []
        default:
            return state;
    }
} // end of closetItemReducer

// Closet Outfit DetailsReducer
const closetOutfitDetailsReducer  = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CLOSET_OUTFIT_DETAILS':
            return action.payload;
        case 'CLEAR_OUTFIT_DETAILS':
            return {}
        default:
            return state;
    }
}

// const searchResults = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_CLOSET_SEARCH_RESULTS':
//             return action.payload;
//         case 'CLEAR_CLOSET_SEARCH_RESULTS':
//             return [];
//     }
//     return state;
// }

const constraint = (state = 'closetOutfits', action) => {
    switch (action.type) {
        case 'SET_CLOSET_SEARCH_CONSTRAINT':
            return action.payload;
    }
    return state;
}

const categories = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CLOSET_SEARCH_CATEGORY':
            return [...state, action.payload];
        case 'REMOVE_CLOSET_SEARCH_CATEGORY':
            let filtered = state.filter(category => category != action.payload);
            return filtered;

    }
    return state;
}

const query = (state = '', action) => {
    switch (action.type) {
        case 'SET_CLOSET_SEARCH_QUERY':
            return action.payload;
    }
    return state; 
}

export default combineReducers({
    closetOutfitsReducer,
    closetItemReducer,
    closetOutfitDetailsReducer,
    // searchResults,
    constraint,
    categories,
    query
})