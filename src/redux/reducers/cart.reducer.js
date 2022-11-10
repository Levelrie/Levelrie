export default function cart(state = [], action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload];
        case 'REMOVE_FROM_CART':
            return state.filter(element => element !== action.payload)
        case 'CLEAR_CART':
            return [];
    }
    return state;
}