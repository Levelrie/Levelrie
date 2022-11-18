export default function occasions(state = [], action) {
    switch (action.type) {
        case 'SET_OCCASIONS_NAMES':
            return action.payload;
        case 'CLEAR_OCCASIONS_NAMES':
            return [];
    }
    return state;
}