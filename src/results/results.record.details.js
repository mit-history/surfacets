import React, { Component } from 'react';
import I18N from './../common/i18n';
import pack from './results.i18n.json';
import datePack from './../common/date.i18n.json';
import Icon from '../common/icon';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    filterOn: state.filterOn
  };
}

const DISPLAY_CALENDAR = 'display=2';
const SEARCH_PARAMETER_SEPARATOR = '&';

class ResultsRecordDetails extends Component {
  render() {
    const calendarLinkSuffix = this.createCalendarDeeplink(this.props.filterOn);

    return (
      <div className='results-record__body'>
        <div>
          <span className='results-record__label'>{I18N.get('record-date', pack)}</span>
          <span className='results-record__symbol'> : </span>
          <span className='results-record__value results-record__value--actionable'>
            {I18N.format('record-date-format', pack,
              I18N.get('day-' + this.props.record.date.dayName.toLowerCase(), datePack),
              parseInt(this.props.record.date.day, 10),
              I18N.get('month-' + this.props.record.date.month, datePack),
              this.props.record.date.year)}
          </span>
          {this.props.record.entryLink ? <a href={this.props.record.entryLink} target='_blank'>
            <Icon iconClass={'fa-book results-record__show'} alternate={true}/>
          </a>: null}
          <a href={I18N.get('record-analytics', pack) + calendarLinkSuffix} target='_blank'>
            <Icon iconClass={'fa-calendar results-record__calendar'} alternate={true}/>
          </a>
        </div>
        <div>
          <span className='results-record__label'>{I18N.get('record-theater', pack)}</span>
          <span className='results-record__symbol'> : </span>
          <span className='results-record__value'>{this.props.record.theater ? this.props.record.theater : I18N.get('record-not-available', pack)}</span>
        </div>
        {this.props.record.pieces.map((piece, index) => (
          <div key={index}>
            <div className='results-record__separator'/>
            {Object.keys(piece).map(key =>
              <div key={key}>
                <span className='results-record__label'>{I18N.get('record-' + key, pack)}</span>
                <span className='results-record__symbol'> : </span>
                <span className='results-record__value' title={piece[key]}>{piece[key]}</span>
              </div>
            )}
          </div>)
        )}
        <div className='results-record__separator'/>
        <div>
          <span className='results-record__label'>{I18N.get('record-receipts', pack)}</span>
          <span className='results-record__symbol'> : </span>
          <span className='results-record__value'>{I18N.format('record-pounds', pack, this.props.record.receipts)}</span>
        </div>
        {Object.keys(this.props.record.entries).map(entry =>
          <div key={entry} className='results-record__receipts'>
            <span title={pack['record-' + entry] ? I18N.get('record-' + entry, pack) : entry} className='results-record__label'>{pack['record-' + entry] ? I18N.get('record-' + entry, pack) : entry}</span>
            <span className='results-record__symbol'> : </span>
            <span className='results-record__number'>{I18N.format('record-audiences', pack, this.props.record.entries[entry].quantity)}</span>
            <span className='results-record__symbol'> X </span>
            <span className='results-record__number'>{this.props.record.entries[entry].price}</span>
            <span className='results-record__symbol'> = </span>
            <span className='results-record__number'>{this.props.record.entries[entry].total}</span>
          </div>
        )}
      </div>
    );
  }

  createCalendarDeeplink(filterOn) {
    return  '?' + Object.keys(filterOn).map(filter => `${filter}=${filterOn[filter]}`).concat(DISPLAY_CALENDAR).join(SEARCH_PARAMETER_SEPARATOR);
  }
}

export default connect(mapStateToProps)(ResultsRecordDetails);