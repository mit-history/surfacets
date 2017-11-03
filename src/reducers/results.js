import {SHOW_RESULTS, 
    HIDE_RESULTS,
    RECEIVE_RESULTS, 
    REQUEST_RESULTS, 
    SELECT_RECORD,
    RESET_RESULTS, CHANGE_VIEW_MODE, VIEW_MODE_SUMMARY} from '../results/action';

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

export const results = (state = {
        opened: false, 
        page: 0, 
        viewMode: VIEW_MODE_SUMMARY,
        records: []
    }, action) => {
    let newState = state;

    switch(action.type) {
        case SHOW_RESULTS:
        case HIDE_RESULTS:
            newState = Object.assign({}, state, {opened: action.opened});
            break;
        case RECEIVE_RESULTS:
            newState = Object.assign({}, state, {
                isFetching: false,
                page: action.page,
                records: state.records.concat(action.records),
                [action.page.toString()]: records(state[action.page], action)
            });
            break;
        case REQUEST_RESULTS:
            newState = Object.assign({}, state, {
                isFetching: true,
                page: action.page,
                [action.page]: records(state[action.page], action)
            });
            break;
        case RESET_RESULTS: 
            newState = Object.assign({}, {
                opened: false,
                page: action.page,
                records: action.records,
                viewMode: VIEW_MODE_SUMMARY
            });
            break;
        case CHANGE_VIEW_MODE: 
            newState = Object.assign({}, state, {
                viewMode: action.mode
            });
            break;
        case SELECT_RECORD: 
            newState = Object.assign({}, state, {
                selectedRecord: action.record
            });
            break;
        default:
            break;
    }

    return newState;
}  
