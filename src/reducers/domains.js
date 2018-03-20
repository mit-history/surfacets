import {ACTIVATE_DOMAIN, ACTIVATE_DOMAINS, RESET_DOMAINS} from '../domains/action';

const DOMAINS = [
  {id: 'authors-facet', resource: 'authors-facet'},
  {id: 'plays-facet', resource: 'plays-facet'},
  {id: 'genres-facet', resource: 'genres-facet'},
  {id: 'periods-facet', resource: 'periods-facet'},
  {id: 'receipts-facet', resource: 'receipts-facet'},
  // {id: 'theaters-facet', resource: 'theaters-facet'} // Enable to show up the theater facet, will need some backend to comply
];

function activateDomain(currentDomain, action) {
  let domain = currentDomain;
  if(currentDomain.id !== action.id) {
    if(domain.index === action.index) {
      if(!isNaN(action.fromIndex)) {
        domain = Object.assign({}, currentDomain, {
          index: action.fromIndex
        });
      } else {
        domain = Object.assign({}, currentDomain, {
          index: NaN,
          active: false
        });
      }
    }
  } else {
    if(!isNaN(action.fromIndex) || action.fromIndex !== action.index) {
      return Object.assign({}, currentDomain, {
        active: true,
        index: action.index
      });
    } else if(isNaN(action.index)) {
      return Object.assign({}, currentDomain, {
        active: false,
        index: NaN
      });
    }
  }

  return domain;
}

const domain = (state = {}, action) => {
  switch (action.type) {
    case ACTIVATE_DOMAIN:
      return activateDomain(state, action);
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