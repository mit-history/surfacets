import {SHOW_RESULTS, HIDE_RESULTS, RECEIVE_RESULTS, REQUEST_RESULTS} from '../results/action';

export const results = (state = {opened: false}, action) => {
    switch(action.type) {
        case SHOW_RESULTS:
        case HIDE_RESULTS:
            return Object.assign({}, state, {opened: action.opened});
        case RECEIVE_RESULTS:
            return Object.assign({}, state, {isFetching: false, records: action.records});
        case REQUEST_RESULTS:
            return Object.assign({}, state, {isFetching: true});
        default:
            return state;
    }
}