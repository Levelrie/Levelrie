const outerwearReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_OUTERWEAR':
      return action.payload;
    case 'CLEAR_OUTERWEAR':
      return {};
    default:
      return state;
  }
};

export default outerwearReducer;