import fetch from 'isomorphic-fetch'

export const REQUEST_FILTERS = 'REQUEST_FILTERS';
export const RECEIVE_FILTERS = 'LIST_FILTERS';
export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';

function requestFilters(filter) {
  return {
    type: REQUEST_FILTERS,
    filter
  }
}

function receiveFilters(filter, json) {
  return {
    type: RECEIVE_FILTERS,
    filter,
    data: json.map(entry => {
      const index = entry[0].indexOf('(');
      return {
        id: entry[0],
        name: (index !== -1 ? entry[0].substring(0, index) : entry[0]),
        info: (index !== -1 ? entry[0].substring(index, entry[0].indexOf(')')) : ''),
        count: entry[1]
      }
    }),
    receivedAt: Date.now() 
  }
}

function fetchFilters(state, filter) {
  return dispatch => {
    dispatch(requestFilters(filter));
    const requestFilter = makeFilter(state.filterOn);
    return fetch(`http://app.cfregisters.org/registers/counts/${filter}.json?${requestFilter}utf8=%25E2%259C%2593`)
      .then(response => response.json())
      .then(json => dispatch(receiveFilters(filter, json)))
  }
}

function makeFilter(filterOn) {
  let requestFilter = '';
  Object.keys(filterOn).forEach(filter => {
    requestFilter += `filter[${filter}][]=${filterOn[filter]}&`;
  });
  return requestFilter;
}

function shouldFetchFilters(state, filter) {
  let fetch = true;
  const filters = state.filtersByPayload[filter];
  if (filters && filters.isFetching) {
    fetch = false
  } 
  
  return fetch;
}


export function fetchFiltersIfNeeded(filter) {
  return (dispatch, getState) => {
    if (shouldFetchFilters(getState(), filter)) {
      return dispatch(fetchFilters(getState(), filter))
    }
  }
}

export function refreshFilters() {
  return (dispatch, getState) => {
    Object.keys(getState().filtersByPayload).forEach(filter => dispatch(fetchFilters(getState(), filter)));
  }
}

export function addFilter(payload, value) {
  return {
    type: ADD_FILTER,
    payload: payload,
    value: value
  }
}

export function removeFilter(payload) {
  return {
    type: REMOVE_FILTER,
    payload: payload
  }
}