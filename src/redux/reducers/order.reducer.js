

function order(state=[], action){
    switch(action.type){
        case 'SET_ORDERED_ITEMS':
            console.log('order', action.payload)
            return action.payload
    }
    return state
}

export default order