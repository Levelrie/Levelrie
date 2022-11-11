export default function categories(state = [], action) {
    switch (action.type) {
        case 'SET_CATEGORY_NAMES':
            return action.payload;
        case 'CLEAR_CATEGORY_NAMES':
            return [];
    }
    return state;
}