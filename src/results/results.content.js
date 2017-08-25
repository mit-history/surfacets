import React, { Component } from 'react';
import {connect} from 'react-redux';
import './results.content.css';
import ResultsRecord from './results.record';

const mapStateToProps = (state) => {
  return {
    results: state.results
  };
}

class ResultsContent extends Component {
  render() {
    return (
      <section className='results-content'>
          {this.props.results.records ? 
            this.props.results.records.map(record => <ResultsRecord key={record.number} record={record}/>) : ''}
      </section>
    );
  }
}

export default connect(mapStateToProps)(ResultsContent);