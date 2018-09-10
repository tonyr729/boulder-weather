export const previousYearReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PREVIOUS_YEAR_DATA':
      return [...action.previousYearData];
    default:
      return state;
  }
};