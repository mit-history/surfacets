import { combineReducers } from 'redux';
import domains from './domains';
import {filtersDefinition, filtersByPayload, filterOn, sort} from './filters';
import {results} from './results';

const surfacetsApp = combineReducers({
  domains,
  filtersByPayload,
  filtersDefinition,
  filterOn,
  sort,
  results
})

export default surfacetsApp