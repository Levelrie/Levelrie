export default function occasions(state = [], action) {
  switch (action.type) {
      case 'SET_OCCASIONS':
          return action.payload;
      case 'CLEAR_OCCASIONS':
          return [];
  }
  return state;
}