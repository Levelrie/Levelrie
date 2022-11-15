export default function cart(state = [], action) {
    switch (action.type) {
        case 'SET_CART_ITEMS':
            console.log('here???',action.payload)
            return action.payload;
        case 'REMOVE_FROM_CART':
            return state.filter(element => element !== action.payload)
        case 'CLEAR_CART':
            return [];
    }
    return state;
}

// {name: 'Black Tank', color: 'Black', size: 'XXS',seller: 'Anine Bing', price:	'$105.00', img:	'https://res.cloudinary.com/dgainc6rr/image/upload/v1667588877/Tops/image-19_j7r1lc.png'}