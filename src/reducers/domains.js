import {ACTIVATE_DOMAIN, ACTIVATE_DOMAINS, RESET_DOMAINS} from '../domains/action';

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
        index: !state.active ? action.index : undefined
      });
    default:
      return state;
  }
}

const domains = (state = DOMAINS, action) => {
  switch (action.type) {
    case ACTIVATE_DOMAIN:
      return state.map(d =>
        domain(d, action)
      );
    case ACTIVATE_DOMAINS: 
      return state.map((d, index) =>
        d.active ? d : domain(d, {
          type: ACTIVATE_DOMAIN,
          id: d.id,
          index: index + 1
        })
      );
    case RESET_DOMAINS:
      return DOMAINS.slice();
    default:
      return state;
  }
}

export default domains