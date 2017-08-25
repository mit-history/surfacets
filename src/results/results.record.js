import React, { Component } from 'react';
import I18N from './../common/i18n';
import pack from './results.i18n.json';
import './results.record.css';

class ResultsRecord extends Component {
  render() {
    return (
      <div className='results-record__container'>
        <div className='results-record'>
          <h5 className='results-record__title'>
            <span>{I18N.format('record-title', pack, this.props.record.entry)}</span>
            <span style={{'float': 'right'}}>{this.props.record.number} / {this.props.record.total}</span>
          </h5>
          <hr className='results-record__separator'/>
          <div>
            <span className='results-record__field'>{I18N.get('record-date', pack)}</span>
            <span className='results-record__colon'> : </span>
            <span className='results-record__value'>{this.props.record.date}</span>
          </div>
          {this.props.record.pieces.map((piece, index) => 
            (<div key={index}>
              <hr className='results-record__separator'/>
              {Object.keys(piece).map(key => 
                <div key={key}>
                  <span className='results-record__field'>{I18N.get('record-' + key, pack)}</span>
                  <span className='results-record__colon'> : </span>
                  <span className='results-record__value'>{piece[key]}</span>
                </div>
              )}
            </div>)
          )}
        </div>
      </div>
    );
  }
}

export default ResultsRecord;