import React, { Component } from 'react';
import I18N from './../common/i18n';
import pack from './results.i18n.json';
import {connect} from 'react-redux';
import './results.bar.css';
import {showResults, hideResults} from './action';

const mapStateToProps = (state) => {
  return {
    results: state.results
  };
}

class ResultsBar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  render() {
    let count = '-';
    if(this.props.results.records && this.props.results.records[0]) {
      count = this.props.results.records[0].total;
    }

    return (
      <header 
      className='results-bar'
      onClick={this.handleClick}>
        <h3 className='results-bar__title'>{I18N.format('entries', pack, count)}</h3>
        <span className='results-bar__arrow'>
          <span className={['chevron'].concat(this.props.results.opened ? 'chevron--down': 'chevron--up').join(' ')}></span>
        </span>
      </header>
    );
  }

  handleClick(event) {
    this.props.results.opened ? this.props.dispatch(hideResults()) : this.props.dispatch(showResults());
  }
}

export default connect(mapStateToProps)(ResultsBar);