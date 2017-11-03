import React, { Component } from 'react';
import {connect} from 'react-redux';
import './results.content.css';
import ResultsRecord from './results.record';
import InfiniteScroll from 'react-infinite-scroller';
import {fetchResultsIfNeeded, VIEW_MODE_DETAILED, VIEW_MODE_SELECTION} from './action';

const mapStateToProps = (state) => {
  return {
    records: state.results.records,
    page: state.results.page,
    hasMore: state.results.opened,
    viewMode: state.results.viewMode
  };
}

class ResultsContent extends Component {
  constructor(props) {
    super(props);

    this.handleLoadMore = this.handleLoadMore.bind(this);    
  }

  render() {
    const classes = ['results-content'].concat(this.props.viewMode === VIEW_MODE_SELECTION ? ['results-content--split'] : []).join(' ');
    return (
      <section className={classes}>        
        <InfiniteScroll 
          pageStart={this.props.page} 
          hasMore={this.props.hasMore} 
          loadMore={this.handleLoadMore} 
          initialLoad={false}
          threshold={500}
          useWindow={false}>
          {this.props.records ? 
            this.props.records.map(record => <ResultsRecord key={record.number} record={record} 
              opened={this.props.viewMode === VIEW_MODE_DETAILED} 
              selectable={this.props.viewMode === VIEW_MODE_SELECTION}/>) : ''}
        </InfiniteScroll>
      </section>
    );
  }

  handleLoadMore(page) {
    this.props.dispatch(fetchResultsIfNeeded(this.props.page + 1));
  }
}

export default connect(mapStateToProps)(ResultsContent);