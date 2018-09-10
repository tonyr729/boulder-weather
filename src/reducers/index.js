import { combineReducers } from 'redux';
import { currentYearReducer } from './currentYearReducer';
import { previousYearReducer } from './previousYearReducer';

export const rootReducer = combineReducers({
  currentYearData: currentYearReducer,
  previousYearData: previousYearReducer
});