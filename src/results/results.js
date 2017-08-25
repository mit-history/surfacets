import React, { Component } from 'react';
import ResultsBar from './results.bar';
import ResultsContent from './results.content';
import {connect} from 'react-redux';
import {fetchResultsIfNeeded} from './action';
import './results.css';


const mapStateToProps = (state) => {
  return {
    results: state.results
  };
}

class Results extends Component {
  componentDidMount() {
    this.props.dispatch(fetchResultsIfNeeded());
  }

  render() {
    return (
      <section className='results'>
        <ResultsBar/>
        <ResultsContent />
      </section>
    );
  }
}

export default connect(mapStateToProps)(Results);