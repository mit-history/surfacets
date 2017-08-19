import {REQUEST_FILTERS, RECEIVE_FILTERS} from './../filters/action';

const FILTERS = {
  'authors-facet': [
    {id: 'author-1-filter', resource: 'author-1-filter', payload: 'author1.json'},
    {id: 'author-2-filter', resource: 'author-2-filter', payload: 'author2.json'}
  ],
  'plays-facet': [
    {id: 'play-1-filter', resource: 'play-1-filter', payload: 'title1.json'},
    {id: 'play-2-filter', resource: 'play-2-filter', payload: 'title2.json'}
  ],
  'genres-facet': [
    {id: 'genre-1-filter', resource: 'genre-1-filter', payload: 'genre1.json'},
    {id: 'genre-2-filter', resource: 'genre-2-filter', payload: 'genre2.json'}
  ],
  'periods-facet': [
    {id: 'period-1-filter', resource: 'period-1-filter', payload: 'weekday.json'},
    {id: 'period-2-filter', resource: 'period-2-filter', payload: 'season.json'}
  ],
  'receipts-facet': [
    {id: 'receipt-1-filter', resource: 'receipt-1-filter', payload: 'total_receipts.json'},
    {id: 'receipt-2-filter', resource: 'receipt-2-filter', payload: 'parterre_receipts.json'}
  ],
  'theaters-facet': [
    {id: 'theater-1-filter', resource: 'theater-1-filter', payload: 'theater1.json'},
    {id: 'theater-2-filter', resource: 'theater-2-filter', payload: 'theater2.json'}
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
      console.log(action);
      return Object.assign({}, state, {
        [action.filter]: filters(state[action.filter], action)
      });
    default:
      return state;
  }
}