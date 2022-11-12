const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return action.payload;
    case 'CLEAR_ITEMS':
      return [];
    default:
      return state;
  }
};

// items will be on the redux state at:
// state.items
export default itemsReducer;