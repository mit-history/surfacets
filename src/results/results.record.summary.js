import React, { Component } from 'react';
import I18N from './../common/i18n';
import pack from './results.i18n.json';
import datePack from './../common/date.i18n.json';

class ResultsRecordSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title1: this.props.record.pieces[0].title1,
      author1: this.props.record.pieces[0].author,
      title2: this.props.record.pieces[1] ? this.props.record.pieces[1].title2 : '',
      author2: this.props.record.pieces[1] ? this.props.record.pieces[1].author : ''
    };
  }

  render() {
    return (
      <div className='results-record__summary'>
        <span className='results-record__value results-record__value--summary'>
          {I18N.format('record-date-format', pack, 
            I18N.get('day-' + this.props.record.date.dayName.toLowerCase(), datePack),
            parseInt(this.props.record.date.day, 10),
            I18N.get('month-' + this.props.record.date.month, datePack),
            this.props.record.date.year)}
        </span>
        <span className='results-record__value results-record__value--summary' title={this.state.title1}>{this.state.title1}</span>
        <span className='results-record__value results-record__value--summary results-record__value--secondary'>{this.props.record.theater ? this.props.record.theater : I18N.get('record-not-available', pack)}</span>
        <span className='results-record__value results-record__value--summary results-record__value--secondary' title={this.state.author1}>{this.state.author1}</span>
        <span className='results-record__value results-record__value--summary'>{I18N.format('record-pounds', pack, this.props.record.receipts)}</span>
        <span className='results-record__value results-record__value--summary' title={this.state.title2}>{this.state.title2}</span>
        <span className='results-record__value results-record__value--summary results-record__value--secondary'></span>
        <span className='results-record__value results-record__value--summary results-record__value--secondary' title={this.state.author2}>{this.state.author2}</span>
      </div>
    );
  }
}

export default ResultsRecordSummary;