const accessoryReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACCESSORY':
      return action.payload;
    case 'CLEAR_ACCESSORY':
      return {};
    default:
      return state;
  }
};

export default accessoryReducer;