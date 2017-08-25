import { combineReducers } from 'redux';
import domains from './domains';
import {filtersDefinition, filtersByPayload, filterOn} from './filters';
import {results} from './results';

const surfacetsApp = combineReducers({
  domains,
  filtersByPayload,
  filtersDefinition,
  filterOn,
  results
})

export default surfacetsApp