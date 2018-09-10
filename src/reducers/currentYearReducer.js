export const currentYearReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CURRENT_YEAR_DATA':
      return [...action.currentYearData];
    default:
      return state;
  }
};