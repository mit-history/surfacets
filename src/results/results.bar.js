import React, { Component } from 'react';
import I18N from './../common/i18n';
import pack from './results.i18n.json';
import './results.bar.css';

class ResultsBar extends Component {
  render() {
    return (
      <header className='results-bar'>
        <h3 className='results-bar__title'>{I18N.format('entries', pack, this.props.count)}</h3>
        <span className='results-bar__arrow'>A</span>
      </header>
    );
  }
}

export default ResultsBar;