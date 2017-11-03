import React, { Component } from 'react';
import I18N from './../common/i18n';
import pack from './results.i18n.json';
import Icon from '../common/icon';
import ResultsRecordDetails from './results.record.details';
import ResultsRecordSummary from './results.record.summary';
import './results.record.css';
import PDFGenerator from './../common/pdf';
import {connect} from 'react-redux';
import {selectRecord, VIEW_MODE_SELECTION} from './action';

const mapStateToProps = (state) => {
  return {
    viewMode: state.results.viewMode
  };
}

class ResultsRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {opened: this.props.opened};
    this.handleClick = this.handleClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);    
    this.handleDownloadClick = this.handleDownloadClick.bind(this);    
  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => ({
      opened: prevState.forced ? prevState.opened : nextProps.opened,
      forced: false
    }));    
  }

  render() {
    let result;
    const classes = ['results-record__container'].concat(this.props.selectable ? ['results-record--selectable'] : ['results-record--static']).join(' ');
    if (this.props.record) {
      result = (
        <div className={classes} onClick={this.handleClick}>
          <div className='results-record__box'>
            <div className='results-record__header' onClick={this.handleToggleClick}>
              <h5 className='results-record__title'>
                <Icon iconClass={'fa-download results-record__download'} alternate={true} onClick={this.handleDownloadClick}/>
                <span>{I18N.format('record-title', pack, this.props.record.entry)}</span>
                <span style={{'float': 'right'}}>
                  {this.props.record.number} / {this.props.record.total}
                  {this.props.viewMode !== VIEW_MODE_SELECTION ? 
                    <Icon alternate={true} iconClass={this.state.opened ? 'fa-chevron-up results-record__toggle' : 'fa-chevron-down results-record__toggle'}/> : 
                    null}
                </span>
              </h5>
            </div>
            {this.state.opened ? <ResultsRecordDetails record={this.props.record}/> : <ResultsRecordSummary record={this.props.record}/>}        
          </div>
        </div>
      );
    } else {
      result = (
        <div className={classes} onClick={this.handleClick}>
        </div>
      )
    }

    return result;        
  }

  handleClick() {
    if (this.props.viewMode === VIEW_MODE_SELECTION) {
      this.props.dispatch(selectRecord(this.props.record));
    }
  }

  handleToggleClick() {
    if (this.props.viewMode !== VIEW_MODE_SELECTION) {
      this.setState((prevState, props) => ({
        opened: !prevState.opened,
        forced: true
      }));
    }   
  }

  handleDownloadClick(event) {
    event.preventDefault();
    event.stopPropagation();
    let generator = new PDFGenerator();
    generator.saveRecord(this.props.record, 
      pack, 
      this.props.record.entry.replace(/\s*/g, '').replace(/\//g, '_'));    
  }  
}

export default connect(mapStateToProps)(ResultsRecord);