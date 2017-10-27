import {SHOW_RESULTS, 
    HIDE_RESULTS,
    RECEIVE_RESULTS, 
    REQUEST_RESULTS, 
    RESET_RESULTS} from '../results/action';

const records = (state = {records: []}, action) => {
    let newState = state;

    switch(action.type) {
        case RECEIVE_RESULTS:
            newState = Object.assign({}, state, {isFetching: false, records: action.records, page: action.page});
            break;
        case REQUEST_RESULTS:
            newState = Object.assign({}, state, {isPending: false, isFetching: true, page: action.page});
            break;
        default:
            break;
    }

    return newState;
}

export const results = (state = {opened: false, page: 0, records: []}, action) => {
    let newState = state;

    switch(action.type) {
        case SHOW_RESULTS:
        case HIDE_RESULTS:
            newState = Object.assign({}, state, {opened: action.opened});
            break;
        case RECEIVE_RESULTS:
            newState = Object.assign({}, state, {
                page: action.page,
                records: state.records.concat(action.records),
                [action.page.toString()]: records(state[action.page], action)
            });
            break;
        case REQUEST_RESULTS:
            newState = Object.assign({}, state, {
                page: action.page,
                [action.page]: records(state[action.page], action)
            });
            break;
        case RESET_RESULTS: 
            newState = Object.assign({}, {
                opened: false,
                page: action.page,
                records: action.records
            });
            break;
        default:
            break;
    }

    return newState;
}  
