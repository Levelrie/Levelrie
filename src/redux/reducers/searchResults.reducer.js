import { combineReducers } from 'redux';

const searchResults = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload;
        case 'CLEAR_SEARCH_RESULTS':
            return [];
    }
    return state;
}

const constraint = (state = 'globalOutfits', action) => {
    switch (action.type) {
        case 'SET_GLOBAL_SEARCH_CONSTRAINT':
            return action.payload;
    }
    return state;
}

const categories = (state = [], action) => {
    switch (action.type) {
        case 'ADD_GLOBAL_SEARCH_CATEGORY':
            return [...state, action.payload];
        case 'REMOVE_GLOBAL_SEARCH_CATEGORY':
            let filtered = state.filter(category => category != action.payload);
            return filtered;

    }
    return state;
}

const query = (state = '', action) => {
    switch (action.type) {
        case 'SET_GLOBAL_SEARCH_QUERY':
            return action.payload;
    }
    return state; 
}


export default combineReducers({
    searchResults,
    constraint,
    categories,
    query
});