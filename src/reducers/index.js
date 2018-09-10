import { combineReducers } from 'redux';
import { currentYearReducer } from './currentYearReducer';

export const rootReducer = combineReducers({
  currentYearData: currentYearReducer
});