export const SHOW_RESULTS = 'SHOW_RESULTS';
export const HIDE_RESULTS = 'HIDE_RESULTS';
export const REQUEST_RESULTS = 'REQUEST_RESULTS';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const RESET_RESULTS = 'RESET_RESULTS';
export const CHANGE_VIEW_MODE = 'CHANGE_VIEW_MODE';
export const SELECT_RECORD = 'SELECT_RECORD';

const RECORD_PER_PAGE = 20;
const RECORD_LINK = /<a href="([A-z0-9:\/_?\.]+)" class="image-popup-vertical-fit" title="&lt;a href=&#x27;([A-z0-9:\/_?\.]+)&#x27/;
const RECORD_NUMBER = /<div class="results_num">(\d*)\s*\/\s*(\d*)<\/div>/;
const RECORD_ENTRY = /<div class="register_num">([\d\s\/]*)<\/div>/;
const RECORD_DATE = /div class="date">.*<\/a>\s*(\d{2})\/(\d{2})\/(\d{4})\s{1}\((\w+)\)+.*\s+<\/dd>\s*<\/div>/;
const RECORD_DATE_NOLINK = /<div class="date">\s*<dt>[A-zÀ-ÿ\s\d]+<\/dt>\s*<dd>\s*(\d{2})\/(\d{2})\/(\d{4})\s{1}\((\w+)\)+.*\s+<\/dd>\s*<\/div>/;
const RECORD_THEATER = /<div class="theater">\s*<dt>[A-zÀ-ÿ\s\d]+<\/dt>\s*<dd>([A-z\u00C0-\u017F\s\(\)\-,\d&#;:\/\.]+)<\/dd>\s*<\/div>/;
const RECORD_PIECE = /<div class="play">\s*<dt>[A-zÀ-ÿ\s\d]+<\/dt>\s*<dd>([A-z\u00C0-\u017F\s\(\)\-,\d&#;:\/\.]+)<\/dd>\s+<dt>[A-zÀ-ÿ\s]+<\/dt>\s*<dd>([A-z\u00C0-\u017F\s\(\)\-,\d&#;:\/\.]+)<\/dd>\s*<dt>[A-zÀ-ÿ\s\d]+<\/dt>\s*<dd>([A-z\u00C0-\u017F\s\(\)\-,\d&#;:\/\.]+)<\/dd>/g;
const RECORD_RECEIPT_ENTRY = /<dt>\s*<div class="quantity">([0-9]+)<\/div>([A-z\u00C0-\u017F\s\(\)\-,\d&#;:\/\.]+)<\/dt>\s*<dd>\s*<div class="price">([A-z0-9\.,\s]+)<\/div>\s*<div class="total">([A-z0-9\.,\s]+)<\/div>\s*<\/dd>/g;
const RECORD_RECEIPT = /<dt>Recettes<\/dt>\s*<dd>\s*<div class="daily total">L\. ([0-9,\s\(\)]+)<\/div>\s*<\/dd>/;

const PIECE_TITLE = "title";
const PIECE_AUTHOR = "author";
const PIECE_GENRE = "genre";

export const VIEW_MODE_SUMMARY = 'summary';
export const VIEW_MODE_SELECTION = 'selection';
export const VIEW_MODE_DETAILED = 'detailed';

const RECEIPT_SECTIONS = {
  "Theatre": "theater",
  "Loge basse": "lower-lodge",
  "Loge haute": "higher-lodge",
  "Premieres loges": "lodge-1",
  "Secondes Loges": "lodge-2",
  "Troisiemes Loges": "lodge-3",
  "Parterre": "ground",
  "Billet à": "ticket-to",
  "Places de Premieres à": "ticket-to",
  "Places de Galerie à": "ticket-to",
  "Places de Secondes à": "ticket-to",
  "Places de Parquet à": "ticket-to",
  "Places de Troisiemes à": "ticket-to",
  "Places de Paradis à": "ticket-to"
};


function requestResults(filterOn, page) {
  return {
    type: REQUEST_RESULTS,
    filterOn,
    page: page
  }
}

function receiveResults(content, page) {
  let records = content.replace(/\r?\n|\r/g, '').split('</style>');
  records.splice(-1, 1);
  records = records.map(record => createRecord(record));
  return {
    type: RECEIVE_RESULTS,
    records: records,
    page: page,
    receivedAt: Date.now()
  }
}

function fetchResults(state, page) {
  return dispatch => {
    dispatch(requestResults(state.filterOn, page));
    const requestFilter = makeFilter(state.filterOn);
    const forPage = `&offset=${page * RECORD_PER_PAGE}&limit=${RECORD_PER_PAGE}`;
    return fetch(`http://app.cfregisters.org/registers/results?${requestFilter}utf8=%25E2%259C%2593${forPage}`)
      .then(response => response.text())
      .then(text => dispatch(receiveResults(text, page)));
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
  if(content && content.length > 0) {
    // record index and total
    const recordNumber = RECORD_NUMBER.exec(content);
    RECORD_NUMBER.lastIndex = 0;
    record.number = parseInt(recordNumber[1], 10) + 1;
    record.total = recordNumber[2];
    // record entry
    record.entry = RECORD_ENTRY.exec(content)[1];
    RECORD_ENTRY.lastIndex = 0;
    const recordTheater = RECORD_THEATER.exec(content);
    if(recordTheater) {
      record.theater = recordTheater[1].trim();
    }
    RECORD_THEATER.lastIndex = 0;
    // record date
    let date = RECORD_DATE.exec(content);
    if(!date) {
      date = RECORD_DATE_NOLINK.exec(content);
    }
    record.date = {
      dayName: date[4],
      day: date[1],
      month: date[2],
      year: date[3]
    };
    RECORD_DATE.lastIndex = 0;
    RECORD_DATE_NOLINK.lastIndex = 0;
    // record links
    const recordLink = RECORD_LINK.exec(content);
    if(recordLink) {
      record.entryLink = recordLink[1];
      record.bookLink = recordLink[2];
    }
    RECORD_LINK.lastIndex = 0;
    // record pieces
    record.pieces = [];
    let recordPiece = RECORD_PIECE.exec(content);
    let index = 1;
    while(recordPiece) {
      let piece = {};
      piece[PIECE_TITLE + index] = convertValue(recordPiece[1]);
      piece[PIECE_AUTHOR] = convertValue(recordPiece[2]);
      piece[PIECE_GENRE] = convertValue(recordPiece[3]);
      record.pieces.push(piece);
      recordPiece = RECORD_PIECE.exec(content);
      index++;
    }
    RECORD_PIECE.lastIndex = 0;
    // receipts
    record.receipts = RECORD_RECEIPT.exec(content)[1];
    RECORD_RECEIPT.lastIndex = 0;
    // receipts sections
    record.entries = {};
    let recordEntry = RECORD_RECEIPT_ENTRY.exec(content);
    while(recordEntry) {
      const place = recordEntry[2];
      let entry = Object.keys(RECEIPT_SECTIONS).filter(key => key === place).map(key => RECEIPT_SECTIONS[key]);

      // TODO maybe here ?
      if(!entry || entry.length === 0) {
        entry = place;
      }
      record.entries[entry] = {
        quantity: recordEntry[1],
        price: recordEntry[3],
        total: recordEntry[4]
      };
      recordEntry = RECORD_RECEIPT_ENTRY.exec(content);
    }
  }
  record.content = content;

  return record;
}

function convertValue(value) {
  return value.replace(/&#x27;/g, "'");
};

function shouldFetchResults(state, page, dispatch) {
  let fetch = true;
  let results = state.results[page];

  if (!results) {
    if(page > 0 && state.results[page - 1].isFetching) {
      fetch = false;
    } else if(page > 0 && page * RECORD_PER_PAGE > state.results.records[0].total) {
      fetch = false;
    }
  } else if(results && results.isFetching) {
    fetch = false;
  }

  return fetch;
}

export function fetchResultsIfNeeded(page) {
  return (dispatch, getState) => {
    if (shouldFetchResults(getState(), page, dispatch)) {
      return dispatch(fetchResults(getState(), page))
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

export function resetResults() {
  return {
    type: RESET_RESULTS,
    page: 0,
    records: []
  }
}

export function changeViewMode(mode) {
  return {
    type: CHANGE_VIEW_MODE,
    mode: mode
  }
}

export function selectRecord(record) {
  return {
    type: SELECT_RECORD,
    record: record
  }
}