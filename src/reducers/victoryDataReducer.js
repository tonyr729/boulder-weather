export const victoryDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VICTORY_DATA':
      return action.victoryData;
    default:
      return state;
  }
};