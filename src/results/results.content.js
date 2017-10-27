import React, { Component } from 'react';
import {connect} from 'react-redux';
import './results.content.css';
import ResultsRecord from './results.record';
import InfiniteScroll from 'react-infinite-scroller';
import {fetchResultsIfNeeded} from './action';

const mapStateToProps = (state) => {
  return {
    records: state.results.records,
    page: state.results.page,
    hasMore: state.results.opened
  };
}

class ResultsContent extends Component {
  constructor(props) {
    super(props);

    this.handleLoadMore = this.handleLoadMore.bind(this);    
  }

  render() {
    return (
      <section className='results-content'>
        <InfiniteScroll 
          pageStart={this.props.page} 
          hasMore={this.props.hasMore} 
          loadMore={this.handleLoadMore} 
          initialLoad={false}
          threshold={500}
          useWindow={false}>
          {this.props.records ? 
            this.props.records.map(record => <ResultsRecord key={record.number} record={record}/>) : ''}
        </InfiniteScroll>
      </section>
    );
  }

  handleLoadMore(page) {
    console.log(`PAGE:${this.props.page}:NEXT:${this.props.page + 1}`);
    this.props.dispatch(fetchResultsIfNeeded(this.props.page + 1));
  }
}

export default connect(mapStateToProps)(ResultsContent);