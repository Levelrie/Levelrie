const footwearReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FOOTWEAR':
      return action.payload;
    case 'CLEAR_FOOTWEAR':
      return {};
    default:
      return state;
  }
};

export default footwearReducer;