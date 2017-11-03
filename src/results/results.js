import React, { Component } from 'react';
import ResultsBar from './results.bar';
import ResultsContent from './results.content';
import ResultsRecord from './results.record';
import ResultsToolbar from './results.toolbar';
import {connect} from 'react-redux';
import {fetchResultsIfNeeded, VIEW_MODE_SELECTION} from './action';
import './results.css';
import Icon from './../common/icon';

const mapStateToProps = (state) => {
  return {
    results: state.results,
    isFetching: state.results.isFetching,
    selectedRecord: state.results.selectedRecord,
    viewMode: state.results.viewMode
  };
}

class Results extends Component {
  componentDidMount() {
    this.props.dispatch(fetchResultsIfNeeded(0));
  }

  render() {
    return (
      <section className='results'>
        <ResultsBar/>
        <ResultsToolbar/>        
        { this.props.viewMode === VIEW_MODE_SELECTION ? <ResultsRecord record={this.props.selectedRecord} opened={true} selectable={false}/> : null}        
        <ResultsContent />
        {
          this.props.isFetching ? 
            <div className='results__loading'><Icon iconClass={'fa-pulse fa-spinner'} alternate={true}/></div> : 
            null
        } 
      </section>
    );
  }
}

export default connect(mapStateToProps)(Results);