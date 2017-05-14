import React, { Component } from 'react';
import ResultsBar from './results.bar';
import './results.css';

class Results extends Component {
  render() {
    return (
      <section className='results'>
        <ResultsBar count='0'/> 
      </section>
    );
  }
}

export default Results;