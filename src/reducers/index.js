import { combineReducers } from 'redux';
import { currentYearReducer } from './currentYearReducer';
import { previousYearReducer } from './previousYearReducer';
import { lastFiveYearsReducer } from './lastFiveYearsReducer';

export const rootReducer = combineReducers({
  currentYearData: currentYearReducer,
  previousYearData: previousYearReducer,
  lastFiveYearsData: lastFiveYearsReducer
});