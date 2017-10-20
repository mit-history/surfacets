import {ACTIVATE_DOMAIN, RESET_DOMAINS} from '../domains/action';

const DOMAINS = [
  {id: 'authors-facet', resource: 'authors-facet'},
  {id: 'plays-facet', resource: 'plays-facet'},
  {id: 'genres-facet', resource: 'genres-facet'},
  {id: 'periods-facet', resource: 'periods-facet'},
  {id: 'receipts-facet', resource: 'receipts-facet'},
  {id: 'theaters-facet', resource: 'theaters-facet'}
];

const domain = (state = {}, action) => {
  switch (action.type) {
    case ACTIVATE_DOMAIN:
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        active: !state.active,
        index: action.index
      });
    default:
      return state;
  }
}

const domains = (state = DOMAINS, action) => {
  switch (action.type) {
    case ACTIVATE_DOMAIN:
      return state.map(t =>
        domain(t, action)
      );
    case RESET_DOMAINS:
      return DOMAINS.slice();
    default:
      return state;
  }
}

export default domains