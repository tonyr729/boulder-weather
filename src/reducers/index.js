import { combineReducers } from 'redux';
import { currentYearReducer } from './currentYearReducer';
import { previousYearReducer } from './previousYearReducer';
import { lastFiveYearsReducer } from './lastFiveYearsReducer';
import { allDataReducer } from './allDataReducer';
import { victoryDataReducer } from './victoryDataReducer';

export const rootReducer = combineReducers({
  currentYearData: currentYearReducer,
  previousYearData: previousYearReducer,
  lastFiveYearsData: lastFiveYearsReducer,
  allData: allDataReducer,
  victoryData: victoryDataReducer
});