import { combineReducers } from 'redux'
import domains from './domains'
import {filtersDefinition, filtersByPayload} from './filters'

const surfacetsApp = combineReducers({
  domains,
  filtersByPayload,
  filtersDefinition
})

export default surfacetsApp