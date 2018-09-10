export const addCurrentYearData = (currentYearData) => ({
  type: 'ADD_CURRENT_YEAR_DATA',
  currentYearData
});

export const addPreviousYearData = (previousYearData) => ({
  type: 'ADD_PREVIOUS_YEAR_DATA',
  previousYearData
});
export const addLastFiveYearsData = (lastFiveYearsData) => { 
  console.log(lastFiveYearsData)
  return ({
    type: 'ADD_LAST_FIVE_YEARS_DATA',
    lastFiveYearsData
  });
}