import fetch from 'isomorphic-fetch'

export const REQUEST_FILTERS = 'REQUEST_FILTERS';
export const RECEIVE_FILTERS = 'LIST_FILTERS';

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
      return {
        id: entry[0],
        name: entry[0].substring(0, entry[0].indexOf('(')),
        info: entry[0].substring(entry[0].indexOf('('), entry[0].indexOf(')')),
        count: entry[1]
      }
    }),
    receivedAt: Date.now() 
  }
}

function fetchFilters(filter) {
  return dispatch => {
    dispatch(requestFilters(filter));
    return fetch(`http://app.cfregisters.org/registers/counts/${filter}?utf8=%25E2%259C%2593`)
      .then(response => response.json())
      .then(json => dispatch(receiveFilters(filter, json)))
  }
}

function shouldFetchFilters(state, filter) {
  /* const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  } */
  return true;
}


export function fetchFiltersIfNeeded(filter) {
  return (dispatch, getState) => {
    if (shouldFetchFilters(getState(), filter)) {
      return dispatch(fetchFilters(filter))
    }
  }
}