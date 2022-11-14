const bottomReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_BOTTOM':
      return action.payload;
    case 'CLEAR_BOTTOM':
      return {};
    default:
      return state;
  }
};

export default bottomReducer;