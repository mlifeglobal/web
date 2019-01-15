import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the surveys state domain
 */
const selectSurveysDomain = state => state.get('surveys', initialState);

/**
 * Default selector used by Dashboard
 */
const makeSelectSurveys = () =>
  createSelector(selectSurveysDomain, substate => substate);

export default makeSelectSurveys;
export { selectSurveysDomain };
