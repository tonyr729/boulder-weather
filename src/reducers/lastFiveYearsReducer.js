export const lastFiveYearsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LAST_FIVE_YEARS_DATA':
      return [...action.lastFiveYearsData];
    default:
      return state;
  }
};