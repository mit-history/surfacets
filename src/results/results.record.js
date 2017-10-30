import React, { Component } from 'react';
import I18N from './../common/i18n';
import pack from './results.i18n.json';
import Icon from '../common/icon';
import ResultsRecordDetails from './results.record.details';
import ResultsRecordSummary from './results.record.summary';
import './results.record.css';

class ResultsRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {opened: this.props.opened};
    this.handleToggleClick = this.handleToggleClick.bind(this);    
    this.handleDownloadClick = this.handleDownloadClick.bind(this);    
  }

  render() {
    return (
      <div className='results-record__container'>
        <div className='results-record__header' onClick={this.handleToggleClick}>
          <h5 className='results-record__title'>
            <Icon iconClass={'fa-download results-record__download'} alternate={true} onClick={this.handleDownloadClick}/>
            <span>{I18N.format('record-title', pack, this.props.record.entry)}</span>
            <span style={{'float': 'right'}}>
              {this.props.record.number} / {this.props.record.total}
              <Icon alternate={true} iconClass={this.state.opened ? 'fa-chevron-up results-record__toggle' : 'fa-chevron-down results-record__toggle'}/>
            </span>
          </h5>
        </div>
        {this.state.opened ? <ResultsRecordDetails record={this.props.record}/> : <ResultsRecordSummary record={this.props.record}/>}        
      </div>
    );
  }

  handleToggleClick() {
    this.setState((prevState, props) => ({
      opened: !prevState.opened
    }));  
  }

  handleDownloadClick(event) {
    console.log(event);
  }
}

export default ResultsRecord;