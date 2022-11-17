import { combineReducers } from 'redux';

// const frontFit = (state = {}, action) => {
//     switch (action.type) {
//         case 'SET_HOME_SWIPE_OUTFIT':
//             return action.payload;
//     }
//     return state;
// }

const fits = (state = [], action) => {
    switch (action.type) {
        case 'SET_HOME_OUTFITS':
            return action.payload;
        case 'CLEAR_HOME_OUTFITS':
            return [];
    }
    return state;
}

const rejectionFits = (state = [], action) => {
    switch (action.type) {
        case 'SET_OUTFIT_TO_REJECT':
            return [...state, action.payload];
        case 'CLEAR_OUTFITS_TO_REJECT':
            return [];
    }
    return state;
}

const favoriteFits = (state = [], action) => {
    switch (action.type) {
        case 'SET_OUTFIT_TO_FAVORITE':
            return [...state, action.payload];
    }
    return state;
}

export default combineReducers({
    fits,
    rejectionFits,
    favoriteFits
})

