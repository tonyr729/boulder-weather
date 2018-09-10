export const allDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ALL_DATA':
      return [...action.allData];
    default:
      return state;
  }
};