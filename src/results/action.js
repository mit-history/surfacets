export const SHOW_RESULTS = 'SHOW_RESULTS';
export const HIDE_RESULTS = 'HIDE_RESULTS';
export const REQUEST_RESULTS = 'REQUEST_RESULTS';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';

const RECORD_NUMBER = /<div class="results_num">(\d*)\s*\/\s*(\d*)<\/div>/;
const RECORD_ENTRY = /<div class="register_num">([\d\s\/]*)<\/div>/;
const RECORD_DATE = /div class="date">.*<\/a>\s*(\d{2}\/\d{2}\/\d{4}\s{1}\(\w+\))+.*\s+<\/dd>\s*<\/div>/;
const RECORD_PIECE = /<div class="play">\s*<dt>[A-zÀ-ÿ\s\d]+<\/dt>\s*<dd>([A-zÀ-ÿ\s\(\)\-,\d&#;:]+)<\/dd>\s+<dt>[A-zÀ-ÿ\s]+<\/dt>\s*<dd>([A-zÀ-ÿ\s\(\)\-,\d&#;:]+)<\/dd>\s*<dt>[A-zÀ-ÿ\s\d]+<\/dt>\s*<dd>([A-zÀ-ÿ\s\(\)\-,\d&#;:]+)<\/dd>/;

function requestResults(filterOn) {
  return {
    type: REQUEST_RESULTS,
    filterOn
  }
}

function receiveResults(content) {
  let records = content.replace(/\r?\n|\r/g, '').split('</style>');
  records.splice(-1, 1);
  records = records.map(record => createRecord(record));
  // TODO - parse content and create a DTO object from the DOM received
  // TODO - handle paging
  return {
    type: RECEIVE_RESULTS,
    records: records,
    receivedAt: Date.now() 
  }
}

function fetchResults(state) {
  return dispatch => {
    dispatch(requestResults(state.filterOn));
    const requestFilter = makeFilter(state.filterOn);
    return fetch(`http://app.cfregisters.org/registers/results?${requestFilter}utf8=%25E2%259C%2593`)
      .then(response => response.text())
      .then(text => dispatch(receiveResults(text)))
  }
}

function makeFilter(filterOn) {
  let requestFilter = '';
  Object.keys(filterOn).forEach(filter => {
    requestFilter += `filter[${filter}][]=${filterOn[filter]}&`;
  });
  return requestFilter;
}

function createRecord(content) {
  let record = {};
  // console.log(content);
  if(content && content.length > 0) {
    // record index and total
    const recordNumber = RECORD_NUMBER.exec(content);
    RECORD_NUMBER.lastIndex = 0;
    record.number = recordNumber[1];
    record.total = recordNumber[2];  
    // record entry
    record.entry = RECORD_ENTRY.exec(content)[1];
    RECORD_ENTRY.lastIndex = 0;  
    // record date
    record.date = RECORD_DATE.exec(content)[1];
    RECORD_DATE.lastIndex = 0;
    // record pieces
    // TODO - fetch all pieces not only the first
    const recordPiece = RECORD_PIECE.exec(content);
    console.log(recordPiece);
    record.pieces = [];
    record.pieces.push({
      title1: recordPiece[1],
      author: recordPiece[2],
      genre: recordPiece[3]
    })
    RECORD_PIECE.lastIndex = 0;
  }  
  record.content = content;

  return record;
}

function shouldFetchResults(state, filter) {
  let fetch = true;
  const filters = state.filtersByPayload[filter];
  if (filters && filters.isFetching) {
    fetch = false
  } 
  
  return fetch;
}

export function fetchResultsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchResults(getState())) {
      return dispatch(fetchResults(getState()))
    }
  }
}

export function showResults() {
  return {
    type: SHOW_RESULTS, 
    opened: true
  }
};

export function hideResults() {
  return {
    type: HIDE_RESULTS, 
    opened: false
  }
};
