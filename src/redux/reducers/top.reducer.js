const topReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TOP':
      return action.payload;
    case 'CLEAR_TOP':
      return {};
    default:
      return state;
  }
};

export default topReducer;