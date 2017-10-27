import {REQUEST_FILTERS, 
  RECEIVE_FILTERS, 
  ADD_FILTER, 
  REMOVE_FILTER, 
  CLEAR_FILTERS} from './../filters/action';

const FILTERS = {
  'authors-facet': [
    {id: 'author-1-filter', resource: 'author-1-filter', payload: 'author1'},
    {id: 'author-2-filter', resource: 'author-2-filter', payload: 'author2'},
    {id: 'author-3-filter', resource: 'author-3-filter', payload: 'author3'}
  ],
  'plays-facet': [
    {id: 'play-1-filter', resource: 'play-1-filter', payload: 'title1'},
    {id: 'play-2-filter', resource: 'play-2-filter', payload: 'title2'},
    {id: 'play-3-filter', resource: 'play-3-filter', payload: 'title3'}
  ],
  'genres-facet': [
    {id: 'genre-1-filter', resource: 'genre-1-filter', payload: 'genre1'},
    {id: 'genre-2-filter', resource: 'genre-2-filter', payload: 'genre2'},
    {id: 'genre-3-filter', resource: 'genre-3-filter', payload: 'genre3'}
  ],
  'periods-facet': [
    {id: 'period-1-filter', resource: 'period-1-filter', payload: 'season'},
    {id: 'period-2-filter', resource: 'period-2-filter', payload: 'weekday'}
  ],
  'receipts-facet': [
    {id: 'receipt-1-filter', resource: 'receipt-1-filter', payload: 'total_receipts'},
    {id: 'receipt-2-filter', resource: 'receipt-2-filter', payload: 'parterre_receipts'}
  ],
  'theaters-facet': [
    {id: 'theater-1-filter', resource: 'theater-1-filter', payload: 'theater1'}
  ]
}

export const filtersDefinition = (state = FILTERS, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const filters = (state = {data: []}, action) => {
  switch (action.type) {
    case REQUEST_FILTERS: {
      return Object.assign({}, state, {isFetching: true});
    }
    case RECEIVE_FILTERS: {
      return Object.assign({}, state, {isFetching: false, data: action.data});
    }
    default:
      return state;
  }
}

export const filtersByPayload = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_FILTERS:
    case REQUEST_FILTERS:
      return Object.assign({}, state, {
        [action.filter]: filters(state[action.filter], action)
      });
    default:
      return state;
  }
}

export const filterOn = (state = {}, action) => {
  let obj = state;
  
  switch(action.type) {
    case ADD_FILTER:
      obj = Object.assign({}, state);
      obj[action.payload] = action.value;
      console.log(obj);
      break;
    case REMOVE_FILTER:
      obj = Object.assign({}, state);
      delete obj[action.payload];
      break;
    case CLEAR_FILTERS:
      obj = Object.assign({}, state);
      Object.keys(obj).forEach(key => delete obj[key]);
      break;
    default:
      break;
  }

  return obj;
}