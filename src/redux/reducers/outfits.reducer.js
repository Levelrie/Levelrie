export default function outfits(state = {outfits: [], counter: 0}, action) {
    switch (action.type) {
        case 'SET_HOME_OUTFITS':
            return {outfits: action.payload, counter: 0};
        case 'INCREASE_HOME_COUNTER':
            return {...state, counter: counter++}
        case 'CLEAR_HOME_OUTFITS':
            return {outfits: [], counter: 0};
    }
    return state;
}