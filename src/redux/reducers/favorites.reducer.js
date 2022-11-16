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

const constraint = (state = 'favoriteOutfits', action) => {
    switch (action.type) {
        case 'SET_FAVORITES_SEARCH_CONSTRAINT':
            return action.payload;
    }
    return state;
}

const categories = (state = [], action) => {
    switch (action.type) {
        case 'ADD_FAVORITES_SEARCH_CATEGORY':
            return [...state, action.payload];
        case 'REMOVE_FAVORITES_SEARCH_CATEGORY':
            let filtered = state.filter(category => category != action.payload);
            return filtered;

    }
    return state;
}

const query = (state = '', action) => {
    switch (action.type) {
        case 'SET_FAVORITES_SEARCH_QUERY':
            return action.payload;
    }
    return state; 
}

export default combineReducers({
    favoriteOutfitsReducer,
    favoriteItemsReducer,
    constraint,
    categories,
    query
})